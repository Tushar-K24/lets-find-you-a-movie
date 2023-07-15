from datetime import datetime, date, timedelta
import gzip
import json
import requests
import os
import sys
from tqdm import tqdm
from constants import newMovies, dailyExportsUrl

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

updateBodyParams = ["popularity", "vote_average", "vote_count"]
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
    
    # #update movie data in db
    # log.write(f"{datetime.now()} updating movie data for movieID:{movieID}...\n")
    # updateBody = {param: movieData[param] for param in updateBodyParams if param in movieData.keys()}
    # status, response = db.updateMovie(movieID, updateBody)
    # log.write(f"{datetime.now()} {response['message']}\n")
    # if status == 200:
    #     return {"updated": 1, "created": 0}
    # elif status == 404:        
    #     #add new movie in db
    #     log.write(f"{datetime.now()} inserting movie data for movieID:{movieID}...\n")
    #     status, response = db.addMovie(movieData)
    #     log.write(f"{datetime.now()} {response['message']}\n")
    #     if status == 201:
    #         return {"updated": 0, "created": 1}
    
    # add new movie in db
    log.write(f"{datetime.now()} inserting movie data for movieID:{movieID}...\n")
    status, response = db.addMovie(movieData)
    log.write(f"{datetime.now()} {response['message']}\n")
    if status == 201:
        return {"updated": 0, "created": 1}
    if status == 202:
        return {"updated": 1, "created": 0}
    
    return None #if update/add movie unsuccessful    

if __name__ ==  "__main__":

    log = open(f'./logs/log_{today}.txt', 'a')
    log.write(f"{datetime.now()} Starting...\n")
    
    created, updated = 0, 0
    print("Downloading daily exports...")
    data = extract_data_from_json_gz(url)
    if data == None:
        print("Error occurred while downloading, please check logs for more details")
        print("Exiting...")
        sys.exit(0)
    print("Download successful")
    print("Updating Database...")
    # pbar = tqdm(total=newMovies)
    for movie in data:
        if created>=newMovies:
            break
        response = add_movie_pipeline(movie["id"])
        if response == None:
            print(f"Error occurred while adding movie {movie['id']}, please check logs for more details")
            print("Exiting...")
            sys.exit(1)
        created += response["created"]
        updated += response["updated"]
        if (created + updated)%100 == 0:
            print(f"Created: {created}, Updated: {updated}")
        # if response["created"]>0:
            # pbar.update(1)
    print("Movies Added Successfully")

    log.close()