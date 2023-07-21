const MovieLog = require("../models/movieLogSchema");
const Genre = require("../models/genreSchema");

const config = require("../config");
const { getRecommendationService } = require("../utils/recommendations");
const Movie = require("../models/movieSchema");
const { Mongoose, default: mongoose } = require("mongoose");

const getRecommendations = async (req, res) => {
  try {
    const limit = 5;
    const user = req.user.user;
    const genre = req.query.genre || "all";
    const genreString =
      genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
    const genreQuery = genreString === "All" ? {} : { name: genreString };
    const genreList = await Genre.find(genreQuery).distinct("_id");
    if (!genreList || genreList.length === 0) {
      res.status(404).json({ message: "Genre not found" });
    } else {
      // const latestInteractions = await MovieLog.find(
      //   { user: user._id },
      //   { _id: 0, movie: 1 }
      // )
      //   .populate({
      //     path: "movie",
      //     match: {
      //       genre: { $in: genreList },
      //     },
      //     select: { _id: 0, api_id: 1, content_embedding: 1 },
      //   })
      //   .sort({ updatedAt: -1 })
      //   .limit(limit);

      const latestInteractions = await MovieLog.aggregate([
        {
          $match: { user: new mongoose.Types.ObjectId(user._id) },
        },
        {
          $lookup: {
            from: "movies",
            localField: "movie",
            foreignField: "_id",
            as: "movieData",
          },
        },
        {
          $unwind: "$movieData", // Deconstruct the "movieData" array
        },
        {
          $match: { "movieData.genre": { $in: genreList } }, // Filter based on genreList
        },
        {
          $sort: { updatedAt: -1 }, // Sort by "updatedAt" in descending order
        },
        {
          $limit: limit, // Limit the results to 5
        },
        {
          $project: {
            _id: 0, // Exclude the "_id" field from the output
            movieData: {
              api_id: 1, // Include the "api_id" field
              content_embedding: 1, // Include the "content_embedding" field
            },
          },
        },
      ]);
      console.log("genre: ", genre);
      console.log(latestInteractions);
      const recommendations = await getRecommendationService(
        latestInteractions,
        "all" // genreString.toLowerCase()
      );

      if (recommendations.status == 200) {
        const movieIDs = recommendations.data.movies;
        const movies = await Movie.find(
          { api_id: { $in: movieIDs } },
          {
            _id: 0,
            api_id: 1,
            title: 1,
            poster_path: 1,
          }
        ).sort({ popularity: "desc" });
        res.status(200).json({ message: "Movies found", movies });
      } else {
        res.status(recommendations.status).json(recommendations.data);
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getRecommendations };
