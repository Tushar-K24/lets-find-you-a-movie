const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middlewares/authMiddleware");
const {
  getRecommendations,
} = require("../controllers/recommendationsController");

// /user/recommendations
router.get("/recommendations", jwtAuth, getRecommendations);

module.exports = router;
