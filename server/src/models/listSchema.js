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

listSchema.pre("updateOne", async function (next) {
  console.log("inside pre method");
  const movieID = this._update["$addToSet"].movies;
  if (movieID) {
    try {
      const movie = await Movie.findById(movieID);
      if (movie.backdrop_path) {
        const update = {
          $set: {
            imagePath: movie.backdrop_path,
          },
        };
        await this.updateOne({}, update);
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
