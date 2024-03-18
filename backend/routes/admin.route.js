var express = require("express");
var router = express.Router();

const { adminToken } = require("../middleware/admin.token");

const {
  postAdmin,
  postAdminLogin,
  deleteUser,
} = require("../controller/admin.controller");

router.post("/signup", postAdmin);
router.post("/login", postAdminLogin);
router.delete("/delete-user", adminToken, deleteUser);

module.exports = router;
