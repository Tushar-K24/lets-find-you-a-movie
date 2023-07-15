const Movie = require("../../models/movieSchema");
const MovieLog = require("../../models/movieLogSchema");
const Genre = require("../../models/genreSchema");

const getMovies = async (req, res) => {
  /*
    returns the movies requested by the user
    route: /user/movies
    query params: {
        limit: response items limit,
        search: search keyword,
        sort: sorting basis (latest/popularity),
        genre: genre based filtering,
    }
  */
  try {
    const limit = req.query.limit || 20;
    const search = req.query.search || "";
    let sort = req.query.sort || "latest";
    let genre = req.query.genre || "All";
    const genreList = await Genre.distinct("name");
    genre === "All" ? (genre = [...genreList]) : (genre = genre.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    if (sort[0] === "latest") {
      sort[0] = "release_date";
    }
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "desc";
    }

    const genreIds = await Genre.find({ name: { $in: genre } }).distinct("_id");

    const movies = await Movie.find(
      {
        title: { $regex: search, $options: "i" },
      },
      {
        contentEmbedding: 0,
        __v: 0,
      }
    )
      .where("genre")
      .in([...genreIds])
      .sort(sortBy)
      .limit(limit)
      .populate({ path: "genre", select: { _id: 0 } });
    res.status(200).json({ message: "Movies found", movies });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMovie = async (req, res) => {
  /*
    returns the movie details
    route: /user/movies/:movieID
  */
  try {
    const { movieID } = req.params;
    const user = req.user.user;
    const movie = await Movie.findOne({ _id: movieID });
    if (movie) {
      const logExists = await MovieLog.findOne({
        movie: movie._id,
        user: user._id,
      }).count();
      if (!logExists) {
        const newMovieLog = new MovieLog({ movie: movie._id, user: user._id });
        await newMovieLog.save();
      }
      const movieLog = await MovieLog.findOne(
        { movie: movie._id, user: user._id },
        { user: 0, _id: 0 }
      ).populate({
        path: "movie",
        populate: { path: "genre", select: { _id: 0 } },
        select: { contentEmbedding: 0 },
      });
      res.status(200).json({ message: "Movie found", movieLog });
    } else {
      res.status(404).json({ message: "Movie does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getMovies, getMovie };
