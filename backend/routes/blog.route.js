var express = require("express");
var router = express.Router();
const upload = require("../Multer");

const {
  postBlog,
  blogList,
  updateBlog,
  deleteBlog,
} = require("../controller/Blog.controller");

const { adminToken } = require("../middleware/admin.token");
const { userToken } = require("../middleware/user.token");

router.post("/create", upload.single("image"), userToken, postBlog);
router.get("/list", blogList);
router.put("/update", upload.single("image"), userToken, updateBlog);
router.delete("/delete", userToken, deleteBlog);
module.exports = router;
