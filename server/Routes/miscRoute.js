const { UpdateImg ,getImg} = require("../Controller/miscController")
const router = require("express").Router();
const isLoggedIn = require("../utils/middleware.js");

//multer to parse files
const multer = require('multer');
const {storage} = require("../config/cloudinary.js")
const upload = multer({ storage });

router.get('/', getImg);
router.put('/',isLoggedIn, upload.single("image"), UpdateImg);


module.exports = router;