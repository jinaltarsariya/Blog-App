var express = require("express");
var router = express.Router();
const upload = require("../Multer");

const { adminToken } = require("../middleware/admin.token");

const {
  postCategory,
  categoryList,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const { userToken } = require("../middleware/user.token");

router.post("/create", upload.single("image"), userToken, postCategory);
router.get("/list", userToken, categoryList);
router.put("/update", upload.single("image"), userToken, updateCategory);
router.delete("/delete", userToken, deleteCategory);
module.exports = router;
