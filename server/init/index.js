require("dotenv").config({ path: "../.env" });

console.log("url is : ",process.env.MONGO_URL);

const mongoose = require("mongoose");
const initData = require("./dbInitialization");
const GalleryImg = require("../model/GalleryModel.js");


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


//initData is an object in which data is array
//initData.data is array
const initDB = async () =>{
    try{
        await GalleryImg.deleteMany({});
        await GalleryImg.insertMany(initData.data);
        console.log("data was initialized");
    } catch (err) {
        console.log("Error init : ", err)
    }
    
}

initDB();