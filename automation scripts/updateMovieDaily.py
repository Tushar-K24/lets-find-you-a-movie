from datetime import datetime, date, timedelta
import gzip
import json
import requests
import os
import sys
from tqdm import tqdm
from constants import dailyExportsUrl
from config import batchSize, dailyUpdateCount

import utils.apiRequests as api
import utils.dbRequests as db

today = (date.today() - timedelta(days = 1)).strftime("%m_%d_%Y")
url = dailyExportsUrl.replace("{today}", str(today))

def extract_data_from_json_gz(url):
    try:
        
        log.write(f"{datetime.now()} Downloading file from {url}...\n")
        # Download the JSON.gz file
        response = requests.get(url, stream=True)

        # Check if the download was successful
        if response.status_code == 200:
            log.write(f"{datetime.now()} Download successful: {url}\n")
            with open('temp.json.gz', 'wb') as file:
                file.write(response.content)
        else:
            log.write(f"{datetime.now()} Failed to download the file from URL: {url}\n")
            return None
        
        # Extract data from the JSON.gz file
        with gzip.open('temp.json.gz', 'rt', encoding='utf-8') as gz_file:
            json_data = gz_file.read()
            json_data = "[" + json_data.replace("\n", ", ")[:-2] + "]"
            data = json.loads(json_data)

        # Delete the temporary file
        os.remove('temp.json.gz')
        return data

    except requests.exceptions.RequestException as e:
        log.write(f"{datetime.now()} An error occurred during the request: {e}\n")
        return None
    except json.JSONDecodeError as e:
        log.write(f"{datetime.now()} Error decoding JSON: {e}\n")
        return None
    except Exception as e:
        log.write(f"{datetime.now()} An error occurred: {e}\n")
        return None

def add_movie_pipeline(movieID):
    log.write(f"{datetime.now()} adding movieID:{movieID}...\n")
    
    #retrieve movie data from api
    log.write(f"{datetime.now()} requesting movie data for movieID:{movieID}...\n")
    status, response = api.getMovieData(movieID)
    if status != 200:
        log.write(f"{datetime.now()} failed to get movie data: {response['message']}\n")
        return None
    movieData = response
    log.write(f"{datetime.now()} movie data retrieved for movieID:{movieID}\n")
    
    # add new movie in db
    log.write(f"{datetime.now()} inserting movie data for movieID:{movieID}...\n")
    status, response = db.addMovie(movieData)
    log.write(f"{datetime.now()} {response['message']}\n")
    if status == 201:
        return response
    
    return None #if add movie unsuccessful    

if __name__ ==  "__main__":

    log = open(f'./logs/log_{today}.txt', 'a')
    log.write(f"{datetime.now()} Starting...\n")
    
    created = 0
    print("Downloading daily exports...")
    data = extract_data_from_json_gz(url)
    if data == None:
        print("Error occurred while downloading, please check logs for more details")
        print("Exiting...")
        sys.exit(0)
    print("Download successful")
    print("Updating Database...")
    
    #batch processing
    for i in range(0, len(data), batchSize):
        if created >= dailyUpdateCount:
            break
        log.write(f"{datetime.now()} Processing batch {i} - {i + batchSize}\n")
        print(f"processing batch {i} - {i + batchSize}")
        movies = data[i:i+batchSize]
        movieIDs = [movie["id"] for movie in movies]
        
        log.write(f"{datetime.now()} Fetching MovieIDs...\n")
        status, response = db.getMovies(movieIDs)
        log.write(f"{datetime.now()} {response['message']}\n")
        if status != 200: 
            print("Error occurred while fetching movieIDs, please check logs for more details")
            print("Exiting...")
            sys.exit(1)
        existingMovieIDs = response["movies"]
        newMovieIDs = list(set(movieIDs) - set(existingMovieIDs))
        for movieID in tqdm(newMovieIDs):
            if created >= dailyUpdateCount:
                break
            response = add_movie_pipeline(movieID)
            if response == None:
                print(f"Error occurred while adding movie {movieID}, please check logs for more details")
                print("Exiting...")
                sys.exit(2)

            created += 1
    
    print("Movies Added Successfully")

    log.close()