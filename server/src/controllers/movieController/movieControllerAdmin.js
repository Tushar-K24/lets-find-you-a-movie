const Movie = require("../../models/movieSchema");
const { getGenres } = require("../../utils/genre");

const getMovie = async (req, res) => {
  /* 
    returns movie if it exists in database 
    route: /api/admin/movies/:movieID
  */
  try {
    const { movieID } = req.params;
    const movie = await Movie.findOne({ api_id: movieID });
    if (movie) {
      res.status(200).json({ message: "Movie found", movie });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  /*
    updates existing data of movie
    route: /api/admin/movies/:movieID
    body: {
        popularity: //popularity,
        vote_average: //vote_average,
        vote_count: //vote_count,
    }
  */
  try {
    const { movieID } = req.params;
    const { popularity, vote_average, vote_count, content_embedding } =
      req.body;

    const updateData = {
      popularity: popularity,
      vote_average: vote_average,
      vote_count: vote_count,
      contentEmbedding: content_embedding,
    };

    console.log(updateData);
    const movie = await Movie.findOneAndUpdate(
      { api_id: movieID },
      { $set: updateData },
      { new: true }
    );
    if (movie) {
      res.status(200).json({ message: "Movie updated successfully", movie });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addMovie = async (req, res) => {
  /* 
    adds new movie to the database
    route: /api/admin/movies/add       
  */
  try {
    const {
      id,
      backdrop_path,
      poster_path,
      genres,
      title,
      adult,
      overview,
      popularity,
      release_date,
      tagline,
      vote_average,
      vote_count,
      content_embedding,
    } = req.body;

    //create genres
    const genreList = await getGenres(genres);
    if (genreList.status != 200) {
      res.status(genreList.status).json(genreList.data);
    }

    //database params mapping to req body params
    const updatedData = {
      api_id: id,
      title: title,
      poster_path: poster_path,
      backdrop_path: backdrop_path,
      adult: adult,
      release_date: release_date,
      description: overview,
      genre: genreList.data.genre,
      tagline: tagline,
      popularity: popularity,
      vote_average: vote_average,
      vote_count: vote_count,
      content_embedding: content_embedding,
    };

    const movieData = new Movie(updatedData);
    const movie = await movieData.save();
    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { getMovie, updateMovie, addMovie };
