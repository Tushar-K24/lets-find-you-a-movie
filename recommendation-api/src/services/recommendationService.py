import numpy as np
import os
import faiss
from ..config import embeddingSize, faissIndexPath

# returns top k movie IDs as recommendation based on content embedding matrix
def getRecommendations(embeddingMatrix, genre="all", k = 20):
    #format embedding matrix
    if isinstance(embeddingMatrix, list):
        embeddingMatrix = np.array(embeddingMatrix)
    if not os.path.exists(faissIndexPath + genre):
        genre = "all"
    embeddingMatrix = embeddingMatrix.reshape((-1, embeddingSize))
    
    if embeddingMatrix.shape[0] == 0:
        return []
    
    #get faiss index
    index = faiss.read_index(faissIndexPath + genre)
    
    #get results
    scores, ids = index.search(embeddingMatrix, k)
    
    scoreMap = {}
    
    rows,cols = scores.shape
    for i in range(rows):
        for j in range(cols):
            if ids[i][j] not in scoreMap.keys():
                scoreMap[ids[i][j]] = []
            scoreMap[ids[i][j]].append(scores[i][j])

    rec_ids = np.array(list(scoreMap.keys()))
    rec_scores = np.array([sum(value) for value in scoreMap.values()])

    return rec_ids[np.argsort(-rec_scores)][:k].tolist()


