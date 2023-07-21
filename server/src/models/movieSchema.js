const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  api_id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster_path: String,
  backdrop_path: String,
  adult: {
    type: Boolean,
    default: false,
  },
  release_date: Date,
  description: String,
  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  tagline: String,
  popularity: Number,
  vote_average: Number,
  vote_count: Number,
  content_embedding: [
    {
      type: Number,
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
