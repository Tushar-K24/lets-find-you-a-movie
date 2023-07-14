const express = require("express");
const { getUser } = require("../controllers/userController");
const { jwtAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

//get user
router.get("/", jwtAuth, getUser);

module.exports = router;
