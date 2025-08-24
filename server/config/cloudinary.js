// Import the Cloudinary library and access its v2 API
// Cloudinary is a cloud-based service for image and video storage, transformation, and delivery.
const cloudinary = require('cloudinary').v2;

// require("dotenv").config({ path: "../.env" }); //for locally
require("dotenv").config(); //for render

// Import the Cloudinary storage engine for Multer
// Multer is a middleware for handling file uploads in Node.js,
// and multer-storage-cloudinary allows storing files directly in Cloudinary.
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,      // The unique name of the Cloudinary account, used to identify the storage space.
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,      // The API key provided by Cloudinary, required for authentication.
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET // The API secret, used for secure communication with Cloudinary.
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,

    params: {
        folder: 'portfolio_DEV',
        allowedFormats: ["jpg", "jpeg", "png"],
    }
});

module.exports = {
    cloudinary,
    storage
}