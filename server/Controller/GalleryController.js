require("dotenv").config();
const GalleryImg = require("../model/GalleryModel.js");

module.exports.AllImages = async (req, res, next) => {
  try {
    let allGalleryURLs = await GalleryImg.find({});

    res.json(allGalleryURLs);
  } catch (err) {
    res.send("eeerrrroorrr :", err);
  }
};

module.exports.DeleteImg = async (req, res, next) => {
  try {
    let { id } = req.params;
    let galleryImage = await GalleryImg.findByIdAndDelete(id);
    return res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.log("error deleting image : ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.UploadImg = async (req, res, next) => {
    try {
        const imgurl = req.file.path;

        const newImg = new GalleryImg({imageURL: imgurl});
        await newImg.save();

        res.json({success: true, message: "Uploaded Succesfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Not uploaded" });
    }
}
