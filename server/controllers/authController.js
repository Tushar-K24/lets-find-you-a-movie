const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      await bcrypt.compare(password, user.password).then((isEquals) => {
        if (isEquals) {
          res.status(200).json({
            message: "Credentials matched successfully",
            user: user._id,
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