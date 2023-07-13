const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7, authHeader.length);
    }
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Access Token" });
  }
};

const checkAdmin = (req, res, next) => {
  try {
    const user = req.user.user;
    if (user.isAdmin == true) {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized Access" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { jwtAuth, checkAdmin };
