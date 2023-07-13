const express = require("express");
const router = express.Router();
const {
  getAllLists,
  addList,
  getList,
  deleteList,
  addMovietoList,
  deleteMovieFromList,
} = require("../controllers/listController");
const { jwtAuth } = require("../middlewares/authMiddleware");

// /user/lists
router.get("/lists", jwtAuth, getAllLists);
router.post("/lists", jwtAuth, addList);

// /user/lists/:listName
router.get("/lists/:listName", jwtAuth, getList);
router.delete("/lists/:listName", jwtAuth, deleteList);

// /user/lists/:listName/movies
router.post("/lists/:listName/movies", jwtAuth, addMovietoList);

// /user/lists/:listName/movies/:movieID
router.delete("/lists/:listName/movies/:movieID", jwtAuth, deleteMovieFromList);

module.exports = router;
