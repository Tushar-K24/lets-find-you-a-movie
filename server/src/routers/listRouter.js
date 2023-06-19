const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//signup route
router.post("/signup", authController.signup);

//login route
router.post("/login", authController.login);

module.exports = router;
