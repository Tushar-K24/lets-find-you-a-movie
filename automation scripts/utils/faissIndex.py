import numpy as np
import faiss
from config import indexOption, faissIndexPath


def createIndex(ids, moviesEmbeddings, genre="all"):
    # format inputs
    ids = np.array(ids)
    moviesEmbeddings = np.array(moviesEmbeddings)

    filepath = faissIndexPath + genre

    index = faiss.IndexIDMap(indexOption)
    index.add_with_ids(moviesEmbeddings, ids)
    # save index
    faiss.write_index(index, filepath)
    return index
