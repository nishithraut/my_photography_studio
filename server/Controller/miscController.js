require("dotenv").config();
const MiscImg = require("../model/MiscImg.js");

module.exports.UpdateImg = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    // File path (for local) or secure_url if using cloudinary
    const imageUrl = req.file.path;

    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded on cloudinary" });
    }

    // Find by title
    let doc = await MiscImg.findOne({ title });

    if (doc) {
      // update existing
      doc.imageURL = imageUrl;
      await doc.save();
      return res.json({ success: true, message: "Image updated" });
    } else {
      return res.json({ success: false, message: "title is wrong" });
    }
  } catch (err) {
    console.error("Error updating misc image:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.getImg = async (req, res, next) => {
  try {
    console.log("im here")
    console.log(req.query.title);
    const { title } = req.query;
    const img = await MiscImg.findOne({ title });
    console.log(img);

    if (!img) {
      console.log("not found")
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ imageUrl: img.imageURL });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
