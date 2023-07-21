import os
import sys
from utils.dbRequests import getGenreList
from config import genreList

scriptName = "updateRecommendationsWeekly.py"

if __name__ == "__main__":
    status, response = getGenreList()
    if status != 200:
        print("error occurred while fetching genres")
        print("exiting...")
        sys.exit(0)

    genreList.extend(response["genreList"])
    for genre in genreList:
        os.environ["genre"] = genre
        os.system(f"python {scriptName}")
