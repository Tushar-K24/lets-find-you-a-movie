const express = require("express");
const { jwtAuth } = require("../middlewares/authMiddleware");
const { getTopGenres } = require("../controllers/genreController");

const router = express.Router();

// favourites routes
router.get("/genres/top", jwtAuth, getTopGenres);

module.exports = router;
