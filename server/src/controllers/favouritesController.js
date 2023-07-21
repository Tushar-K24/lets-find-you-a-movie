const GenreLog = require("../models/genreLogSchema");
const MovieLog = require("../models/movieLogSchema");
const Movie = require("../models/movieSchema");

const getAllLiked = async (req, res) => {
  /*
    return all movies liked by the user
    route: /user/favourites      
  */
  try {
    const user = req.user.user;
    const movies = await MovieLog.find({
      user: user._id,
      isLiked: true,
    })
      .populate({
        path: "movie",
        select: { _id: 0, api_id: 1, title: 1, poster_path: 1 },
      })
      .lean();
    const likedMovies = movies.map((movieLog) => movieLog.movie);
    res.status(200).json({ message: "Favourites found", likedMovies });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addMovieToLiked = async (req, res) => {
  /*
    adds new movies to liked
    route: /user/favourites 
    body: {
        movieID: //movie id,
        isLiked: // (true/false)
    }     
  */
  try {
    const user = req.user.user;
    const { movieID, isLiked } = req.body;
    const movie = await Movie.findOne({ api_id: movieID });
    await MovieLog.findOneAndUpdate(
      { movie: movie._id, user: user._id },
      { $set: { isLiked: isLiked } },
      { upsert: true }
    );
    const genreList = movie.genre;
    //create bulk ops
    const incrementValue = isLiked ? 1 : -1;
    bulkOpsArr = genreList.map((genre) => {
      return {
        updateOne: {
          filter: { user: user._id, genre: genre._id },
          update: { $inc: { likeCount: incrementValue } },
          upsert: true,
        },
      };
    });
    await GenreLog.bulkWrite(bulkOpsArr);
    res.status(202).json({ message: "Movie status updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllLiked, addMovieToLiked };
