const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
} = require("../../controllers/movieController/movieControllerUser");
const { jwtAuth } = require("../../middlewares/authMiddleware");

router.get("/movies", jwtAuth, getMovies);
router.get("/movies/:movieID", jwtAuth, getMovie);

module.exports = router;
