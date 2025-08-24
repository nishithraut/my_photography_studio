const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galleryImgSchema = new Schema(
    {
        // title: {
        //     type:String,
        //     required: true
        // },
        imageURL: {
            type: String, 
            required: true
        }
    }
)

const GalleryImg = mongoose.model("GalleryImg", galleryImgSchema);
module.exports = GalleryImg;