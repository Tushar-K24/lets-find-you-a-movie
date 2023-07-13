const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

//signup route
router.post("/register", signup);

//login route
router.post("/login", login);

module.exports = router;
