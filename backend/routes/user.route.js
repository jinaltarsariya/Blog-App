var express = require("express");
var router = express.Router();

const { postUser, postUserLogin } = require("../controller/user.controller");

router.post("/register", postUser);
router.post("/login", postUserLogin);

module.exports = router;
