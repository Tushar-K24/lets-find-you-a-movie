import numpy as np
import json
from flask import Blueprint, request, make_response
from services.faissIndexService import createIndex
from services.recommendationService import getRecommendations

apiV1 = Blueprint('recommendations', __name__)

@apiV1.route("/", methods = ['GET', 'POST'])
def health():
    return make_response({"message": 'ok'}, 200)

@apiV1.route("/recommendations/<genre>", methods = ['GET', 'POST'])
def getMovieRecommendations(genre):
    try:
        data = request.get_json()
        #get embeddings
        embeddings = []
        for movie in data["movies"]:
            embeddings.append(movie['content_embedding'])
        embeddings = np.array(embeddings)
        #get recommendations
        recommendations = getRecommendations(embeddings, genre)
        return make_response({"message": "Recommendations found", "movies": recommendations}, 200)
    except Exception as e:
        return make_response({"message": f"{e}"}, 400)
