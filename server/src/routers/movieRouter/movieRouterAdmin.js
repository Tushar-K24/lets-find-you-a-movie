const express = require("express");
const router = express.Router();
const {
  getMovie,
  addMovie,
  updateMovie,
} = require("../../controllers/movieController/movieControllerAdmin");
const { jwtAuth, checkAdmin } = require("../../middlewares/authMiddleware");

router.post("/movies/add", jwtAuth, checkAdmin, addMovie);

router.get("/movies/:movieID", jwtAuth, checkAdmin, getMovie);
router.put("/movies/:movieID", jwtAuth, checkAdmin, updateMovie);

module.exports = router;
