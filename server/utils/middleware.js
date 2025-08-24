const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded; //attach user info (username, password)
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = isLoggedIn;
