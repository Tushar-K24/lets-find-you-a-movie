from datetime import datetime, date, timedelta
import sys
import os

from utils.dbRequests import getAllMovies
from utils.faissIndex import createIndex

today = (date.today() - timedelta(days=1)).strftime("%m_%d_%Y")


def updateRecommendations(genre):
    try:
        log.write(f"{datetime.now()} Fetching movies...\n")
        status, response = getAllMovies(genre)
        if status != 200:
            log.write(
                f"{datetime.now()} Failed to get movie data: {response['message']}\n"
            )
            return None
        movies = response["movies"]
        log.write(
            f"{datetime.now()} Movies retrieved successfully, movies: {len(movies)}\n"
        )
        print(f"{len(movies)} movies retrieved")
        log.write(f"{datetime.now()} Generating embedding matrix...\n")
        ids, embeddings = [], []
        for movie in movies:
            ids.append(movie["api_id"])
            embeddings.append(movie["content_embedding"])

        log.write(f"{datetime.now()} Embedding matrix generated\n")

        log.write(f"{datetime.now()} Creating index...\n")
        createIndex(ids, embeddings, genre=genre)
        log.write(f"{datetime.now()} Index created\n")
        return "ok"
    except Exception as e:
        log.write(f"{datetime.now()} Error occurred: {e}\n")
        return None


if __name__ == "__main__":
    log = open(f"./logs/update/log_{today}.txt", "a")
    log.write(f"{datetime.now()} Starting...\n")

    genre = os.environ["genre"].lower()
    print(f"Updating for Genre: {genre}")
    log.write(f"{datetime.now()} Updating for Genre: {genre}...\n")
    response = updateRecommendations(genre)
    if response == None:
        print(
            f"Error occurred while updating genre: {genre}, please check logs for more details"
        )
        print("Exiting...")
        sys.exit(1)
    print(f"Genre: {genre} Updated successfully")
    log.write(f"{datetime.now()} Genre: {genre} Updated successfully\n")

    log.close()
