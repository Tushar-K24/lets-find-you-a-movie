import faiss

dailyUpdateCount = 100
batchSize = 100
encoder_name = "distilbert-base-nli-stsb-mean-tokens"

faissIndexPath = "../recommendation-api/faissIndices/"
embeddingSize = 768
indexOption = faiss.IndexFlatIP(embeddingSize)
genreList = ["all"]
