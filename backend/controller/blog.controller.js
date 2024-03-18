const {
  error_res,
  success_res,
  checkRequiredFields,
} = require("../library/general");
const blogModel = require("../model/blog.schema");
const validator = require("validator");

const postBlog = async (req, res) => {
  try {
    let { title } = req.body;
    req.body.userId = userId;

    const missingField = checkRequiredFields(req.body, [
      "title",
      "discription",
    ]);
    if (missingField)
      return res.json(error_res(`Please provide ${missingField}!`));

    if (!validator.isAlpha(title)) {
      return res.json(
        error_res(
          "Please enter valid title and do not pass numbers and symbols !"
        )
      );
    }

    if (!(title.length <= 30)) {
      return res.json(error_res("Title is too long!"));
    }

    req.body.image = req?.file?.filename;

    let getBlogByTitleRes = await blogModel.findOne({ title: title });
    if (getBlogByTitleRes) {
      return res.json(error_res("This Title is already registered!"));
    }

    let createBlog = await blogModel.create(req.body);
    return res.json(success_res("Blog created successfully !", createBlog));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const blogList = async (req, res) => {
  try {
    let getAllBlogs = await blogModel.find().populate(["userId", "categoryId"]);
    return res.json(success_res("All blogs are display!", getAllBlogs));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const updateBlog = async (req, res) => {
  try {
    let { userId, categoryId, title, discription, image } = req.body;
    let id = req.query.blogId;

    const missingField = checkRequiredFields(req.body, [
      "title",
      "discription",
    ]);
    if (missingField)
      return res.json(error_res(`Please provide ${missingField}!`));

    if (!validator.isAlpha(title)) {
      return res.json(
        error_res(
          "Please enter valid title and do not pass numbers and symbols !"
        )
      );
    }

    if (!(title.length <= 30)) {
      return res.json(error_res("Title is too long!"));
    }

    req.body.image = req?.file?.filename;

    await blogModel.findByIdAndUpdate(id, req.body);
    return res.json(success_res("Blog updated successfully !"));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const deleteBlog = async (req, res) => {
  try {
    let id = req.query.blogId;
    await blogModel.findByIdAndDelete(id);
    return res.json(success_res("Blog deleted successfully !"));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

module.exports = {
  postBlog,
  blogList,
  updateBlog,
  deleteBlog,
};
