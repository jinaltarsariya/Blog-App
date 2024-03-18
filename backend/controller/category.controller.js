const {
  error_res,
  checkRequiredFields,
  success_res,
} = require("../library/general");
const validator = require("validator");
const categoryModel = require("../model/category.schema");

const postCategory = async (req, res) => {
  try {
    let { name, image } = req.body;
    console.log("req.body --> ", req.body);
    console.log("req.userId ---> ", req.userId);

    const missingField = checkRequiredFields(req.body, ["name"]);

    if (missingField)
      return res.json(error_res(`Please provide ${missingField}!`));

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return res.json(
        error_res(
          "Please enter a valid category name without numbers and symbols!"
        )
      );
    }

    if (!(name?.length <= 50)) {
      return res.json(error_res("Category name is too long!"));
    }

    req.body.image = req?.file?.filename;

    let checkUniqueName = await categoryModel.findOne({ name: name });
    if (checkUniqueName) {
      return res.json(error_res("This category name is alredy registered!"));
    }

    let createCategory = await categoryModel.create(req.body);
    return res.json(
      success_res("Category Created successfully!", createCategory)
    );
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const categoryList = async (req, res) => {
  try {
    let getAllCategpry = await categoryModel.find();
    return res.json(success_res("All category are display!", getAllCategpry));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const updateCategory = async (req, res) => {
  try {
    let { name, image } = req.body;
    let id = req.query.categoryId;

    const missingField = checkRequiredFields(req.body, ["name"]);

    if (missingField)
      return res.json(error_res(`Please provide ${missingField}!`));

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return res.json(
        error_res(
          "Please enter a valid category name without numbers and symbols!"
        )
      );
    }

    if (!(name.length <= 50)) {
      return res.json(error_res("Category name is too long!"));
    }

    req.body.image = req?.file?.filename;

    let checkName = await categoryModel.findOne({ name: name });
    if (checkName) {
      return res.json(error_res("This category name is already registered!"));
    }

    await categoryModel.findByIdAndUpdate(id, req.body);

    return res.json(success_res("Category updated successfully !"));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const deleteCategory = async (req, res) => {
  try {
    let id = req.query.categoryId;
    await categoryModel.findByIdAndDelete(id);

    return res.json(success_res("Category deleted successfully !"));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

module.exports = {
  postCategory,
  categoryList,
  updateCategory,
  deleteCategory,
};
