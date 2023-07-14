const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    const user = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const expiry = {
        expiresIn: user.isAdmin
          ? config.adminAccessTokenExpiry
          : config.accessTokenExpiry,
      };
      await bcrypt.compare(password, user.password).then((isEquals) => {
        if (isEquals) {
          //create jwt token
          const accessToken = jwt.sign(
            {
              user: user,
            },
            process.env.ACCESS_TOKEN_KEY,
            expiry
          );

          const userJSON = { ...user }._doc;
          delete userJSON.password;
          delete userJSON.__v;
          delete userJSON.isAdmin;

          res.status(200).json({
            message: "Credentials matched successfully",
            user: user,
            accessToken: accessToken,
          });
        } else {
          res.status(403).json({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signup, login };
