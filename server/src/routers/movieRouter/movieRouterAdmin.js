const express = require("express");
const router = express.Router();
const {
  getMoviesAll,
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  getAllGenres,
} = require("../../controllers/movieController/movieControllerAdmin");
const { jwtAuth, checkAdmin } = require("../../middlewares/authMiddleware");

router.get("/genres", jwtAuth, checkAdmin, getAllGenres);

router.get("/movies/:genre", jwtAuth, checkAdmin, getMoviesAll);
router.get("/movies", jwtAuth, checkAdmin, getMovies);

router.post("/movies/add", jwtAuth, checkAdmin, addMovie);

router.get("/movies/:movieID", jwtAuth, checkAdmin, getMovie);
router.put("/movies/:movieID", jwtAuth, checkAdmin, updateMovie);

module.exports = router;
