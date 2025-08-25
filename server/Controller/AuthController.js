require("dotenv").config();
// ===== Imports =====
const User = require("../model/UserModel.js"); // Import User model to interact with MongoDB
const { createSecretToken } = require("../utils/SecreteToken"); // Utility function to create JWT token
const bcrypt = require("bcryptjs"); // For comparing hashed passwords
const jwt = require("jsonwebtoken");


// ===== Login Controller =====
module.exports.Login = async (req, res, next) => {
  try {
    // Extract username & password from request body (sent by frontend)
    const { username, password } = req.body;
    console.log("Received login data:", req.body);

    // If either username or password is missing, return an error
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }

    // Find user in MongoDB by username
    const user = await User.findOne({ username });

    // If no user exists with that username, return error
    if (!user) {
      return res.json({ message: "Incorrect username" });
    }
    console.log(user); // Debug: log user object found in DB

    // Compare entered password with hashed password in DB
    const auth = await bcrypt.compare(password, user.password);
    console.log("Password match result:", auth); // true if correct, false if wrong

    // If password does not match, return error
    if (!auth) {
      return res.json({ message: "Incorrect password" });
    }
    
    console.log("Password are matched, creating token with userid");
    // Generate a JWT token using user's unique ID (_id from MongoDB)
    const token = createSecretToken(user._id);

    // Store token in a cookie so it persists in the browser
    res.cookie("token", token, {
      httpOnly: true, 
      secure: true,
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    console.log("cookies: ",token);

    // Send success response to frontend
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });

    // Move to next middleware (if any)
    next();
  } catch (error) {
    console.log("Error in Login controller:", error);
  }
};

module.exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.json({ message: "Logged out successfully" });
    next();
  } catch (error) {
    console.log("logout controller err : ", error);
  }
};

module.exports.CheckAuth = async (req,res, next) =>{
  console.log("Cookies received:", req.cookies);
  const token = req.cookies.token; // 👈 this should match the name you set in login
  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY); // 👈 same secret as in createSecretToken
    return res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    return res.json({ loggedIn: false });
  }
}
