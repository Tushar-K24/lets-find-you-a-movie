const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  api_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
  adult: {
    type: Boolean,
    default: false,
  },
  release_date: Date,
  description: {
    type: String,
  },
  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  popularity: Number,
  vote_average: Number,
  vote_count: Number,
  contentEmbedding: [
    {
      type: Number,
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
