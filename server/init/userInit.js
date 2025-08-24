// ===== Imports =====
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

// ===== Models =====
const User = require("../model/UserModel.js");

// ===== Environment Variables =====
const DB_URL = process.env.MONGO_URL;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// ===== Database Connection =====
async function connectDB() {
    try {
        await mongoose.connect(DB_URL);
        console.log("✅ Connected to MongoDB Atlas");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

// ===== Initialize User =====
async function runInit() {
    try {
        const existingUser = await User.findOne({ username: ADMIN_USERNAME });

        if (existingUser) {
            console.log("⚠️ User already exists!");
            return;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

        await User.create({
            username: ADMIN_USERNAME,
            password: hashedPassword
        });

        console.log("✅ Admin user initialized successfully");
    } catch (err) {
        console.error("❌ Error initializing user:", err);
    }
}

// ===== Run Script =====
(async () => {
    await connectDB();
    await runInit();
})();
