const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeVideoSchema = new Schema(
    {
        title: {
            type:String,
            required: true
        },
        videoURL: {
            type: String, 
            required: true
        }
    }
)

const HomeVideo = mongoose.model("HomeVideo", HomeVideoSchema);
module.exports = HomeVideo;