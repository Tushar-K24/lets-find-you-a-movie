const MovieLog = require("../models/movieLogSchema");

const getAllLiked = async (req, res) => {
  /*
    return all movies liked by the user
    route: /user/favourites      
  */
  try {
    const user = req.user.user;
    const likedMovies = await MovieLog.find({
      user: user._id,
      isLiked: true,
    }).populate("movie");
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
    const movie = await MovieLog.findOneAndUpdate(
      { movie: movieID, user: user._id },
      { $set: { isLiked: isLiked } },
      { upsert: true }
    );
    res.status(200).json({ message: "Movie status updated", movie });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllLiked, addMovieToLiked };
