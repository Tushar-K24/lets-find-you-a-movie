const GenreLog = require("../models/genreLogSchema");

const getTopGenres = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const { user } = req.user;
    const sortBy = { likeCount: "desc" };
    const topGenres = await GenreLog.find(
      { user: user._id },
      { _id: 0, genre: 1 }
    )
      .sort(sortBy)
      .limit(limit)
      .populate({ path: "genre", select: { _id: 0, name: 1 } });
    const genreList = topGenres.map((genre) => genre.genre.name);
    res.status(200).json({ message: "Top Genres found", genreList });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getTopGenres };
