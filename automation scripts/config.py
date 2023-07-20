import faiss

dailyUpdateCount = 100
batchSize = 100
encoder_name = "distilbert-base-nli-stsb-mean-tokens"

faissIndexPath = "../faissIndices/"
embeddingSize = 768
indexOption = faiss.IndexFlatIP(embeddingSize)
genreList = ["all"]
