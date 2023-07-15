const express = require("express");
const router = express.Router();
const {
  getMovies,
} = require("../../controllers/movieController/movieControllerUser");
const { jwtAuth } = require("../../middlewares/authMiddleware");

router.get("/movies", jwtAuth, getMovies);

module.exports = router;
