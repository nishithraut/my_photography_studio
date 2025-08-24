const { Login, Logout, CheckAuth } = require("../Controller/AuthController");
const router = require("express").Router();

router.post('/login', Login);
router.get('/logout', Logout);
router.get('/checkAuth', CheckAuth);

module.exports = router;