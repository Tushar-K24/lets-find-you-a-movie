import requests
import json
from constants import ACCESS_TOKEN as accessToken, API_BASE_URL as apiBaseUrl

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {accessToken}'
    }

# get movie from database
def getMovie(movieID):
    try:
        url = f"{apiBaseUrl}/admin/movies/{movieID}"
        payload = {}
        response = requests.request("GET", url, headers=headers, data=payload)
        return response.status_code, json.loads(response.content)
    except requests.exceptions.ConnectionError as e:
        return 502, {"message": f'ConnectionError: {e}'}
    except Exception as e:
        return 400, {"message": f'An error occurred: {e}'}

# update existing movie data in database
def updateMovie(movieID, data):
    try:
        url = f"{apiBaseUrl}/admin/movies/{movieID}"
        payload = data
        if (isinstance(data, dict)):
            payload = json.dumps(data)
        response = requests.request("PUT", url, headers=headers, data=payload)
        return response.status_code, json.loads(response.content)
    except requests.exceptions.ConnectionError as e:
        return 502, {"message": f'ConnectionError: {e}'}
    except Exception as e:
        return 400, {"message": f'An error occurred: {e}'}

# add movie to the database
def addMovie(data):
    try:
        url = f"{apiBaseUrl}/admin/movies/add"
        payload = data
        if (isinstance(data, dict)):
            payload = json.dumps(data)
        response = requests.request("POST", url, headers=headers, data=payload)
        return response.status_code, json.loads(response.content)
    except requests.exceptions.ConnectionError as e:
        return 502, {"message": f'ConnectionError: {e}'}
    except Exception as e:
        return 400, {"message": f'An error occurred: {e}'}