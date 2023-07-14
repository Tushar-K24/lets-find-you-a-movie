import requests
import json
from constants import MOVIE_BASE_URL as baseUrl, API_KEY as apiKey

def getMovieData(movieID):
    try:
        url = baseUrl.replace("{api_id}", str(movieID)).replace("{api_key}", str(apiKey))
        response = requests.get(url)
        return response.status_code, json.loads(response.content) 
    except Exception as e:
        return 400, {"message": f'An error occurred: {e}'}
    