//env
require("dotenv").config();

//import necessaries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const authRoute = require("./Routes/authRoute");
const galleryRoutes = require("./Routes/galleryRoutes.js");
const miscRoute = require("./Routes/miscRoute.js");

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URL;


// Middleware

const allowedOrigins = ["https://nishithraut.onrender.com"];

app.use(cors({
    origin: allowedOrigins[0],  // wherever your React app runs
    credentials: true                 // Allow cookies
  }));                                // Enables Cross-Origin Resource Sharing
app.use(bodyParser.json());           // Parses incoming JSON requests into req.body




// =======================
//      API ROUTES
// =======================

app.get("/", (req,res,err)=>{
    console.log("Backend is working");
});


app.use("/", authRoute);
app.use("/gallery", galleryRoutes);
app.use("/misc", miscRoute);


// =======================
//      START SERVER
// =======================

app.listen(PORT, () =>{
    console.log(`App is listening on ${PORT}`);

    // Connect to MongoDB when server starts
    mongoose.connect(DB_URL)
        .then(()=> console.log("Connected to MongoDB"))
        .catch((err)=> console.log("MongoDB connection error: ", err));
})