const Movie = require("./movieSchema");
const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  createdUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  imagePath: String,
});

listSchema.pre("save", async function (next) {
  if (this.isModified("movies") && this.movies.length > 0) {
    try {
      const movie = await Movie.findById(this.movies[0]);
      if (movie) {
        this.imagePath = movie.backdrop_path;
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
    }
  }
  next();
});

const List = mongoose.model("List", listSchema);

module.exports = List;
