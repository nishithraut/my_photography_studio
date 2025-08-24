const { AllImages, DeleteImg, UploadImg } = require("../Controller/GalleryController")
const router = require("express").Router();
const isLoggedIn = require("../utils/middleware.js");

//multer to parse files
const multer = require('multer');
const {storage} = require("../config/cloudinary.js")
const upload = multer({ storage });

router.get('/', AllImages);
router.delete('/:id',isLoggedIn, DeleteImg);
router.post('/',isLoggedIn, upload.single("image"), UploadImg);


module.exports = router;