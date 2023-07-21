import faiss

baseUrl = "http://localhost:3000/api/v1"
embeddingSize = 768
indexOption = faiss.IndexFlatIP(embeddingSize)
faissIndexPath = "faissIndices/"
