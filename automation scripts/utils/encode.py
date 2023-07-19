from sentence_transformers import SentenceTransformer
from config import encoder_name

model = SentenceTransformer(encoder_name)


def getMovieDescription(movie):
    description_columns = ["overview", "tagline", "title", "original_title"]
    desc = ""
    for col in description_columns:
        if col in movie.keys() and movie[col] != "":
            desc = movie[col]
            break
    return desc


def encodeData(desc):
    encoded_data = model.encode([desc])
    return encoded_data[0].tolist()
