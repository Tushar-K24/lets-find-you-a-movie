const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  contentEmbedding: [
    {
      type: Number,
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
