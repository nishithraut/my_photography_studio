const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MiscContentSchema = new Schema(
    {
        title: {
            type:String,
            required: true
        },
        imageURL: {
            type: String, 
            required: true
        }
    }
)

const MiscImg = mongoose.model("MiscImg", MiscContentSchema);
module.exports = MiscImg;