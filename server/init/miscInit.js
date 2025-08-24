require("dotenv").config({ path: "../.env" });

console.log("url is : ",process.env.MONGO_URL);

const mongoose = require("mongoose");
const MiscImg = require("../model/MiscImg.js");


const DB_URL = process.env.MONGO_URL;

//connection
main()
.then(()=> {
    console.log("connection portfolio");
})
.catch((err) => console.log("mongoose connection error : ",err));

async function main() {
    await mongoose.connect(DB_URL);
}

const initDB = async () =>{
    try{
        await MiscImg.deleteMany({}); // optional: clear old data

    const sampleData = [
      {
        title: "homePageAboutImg",
        imageURL: "/media/homeAbout.jpg"   // or cloudinary url
      },
      {
        title: "aboutPageAboutImg",
        imageURL: "/media/home.JPG"
      }
    ];

    await MiscImg.insertMany(sampleData);
        console.log("Misc data was initialized");
    } catch (err) {
        console.log("Error init : ", err)
    }
    
}

initDB();