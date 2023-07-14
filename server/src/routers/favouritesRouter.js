const express = require("express");
const { jwtAuth } = require("../middlewares/authMiddleware");
const {
  getAllLiked,
  addMovieToLiked,
} = require("../controllers/favouritesController");
const router = express.Router();

// favourites routes
router.get("/favourites", jwtAuth, getAllLiked);
router.post("/favourites", jwtAuth, addMovieToLiked);

module.exports = router;
