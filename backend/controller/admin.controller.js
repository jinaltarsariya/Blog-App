const {
  checkRequiredFields,
  error_res,
  isEmailValid,
  mobileNumValidation,
  success_res,
} = require("../library/general");
const adminModel = require("../model/admin.schema");
const userModel = require("../model/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const postAdmin = async (req, res) => {
  try {
    let { name, email, mobileNumber, password, confirmPassword } = req.body;

    const missingField = checkRequiredFields(req.body, [
      "name",
      "email",
      "mobileNumber",
      "password",
      "confirmPassword",
    ]);
    if (missingField)
      return res.json(error_res(`Please provide ${missingField}!`));

    if (!validator.isAlpha(name)) {
      return res.json(
        error_res(
          "Please enter valid name and do not pass numbers and symbols !"
        )
      );
    }

    if (name.length < 3) {
      return res.json(error_res("Name must be three characters long !"));
    }
    if (name.length > 25) {
      return res.json(error_res("Name is too long!"));
    }
    if (!isEmailValid(email))
      return res.json(error_res("Please enter a valid email address!"));

    let mobileNumValRes = await mobileNumValidation(mobileNumber);
    if (mobileNumValidation(mobileNumber))
      return res.json(error_res(mobileNumValRes));

    if (password.length < 5)
      return res.json(
        error_res("Password must be at least 5 characters long!")
      );
    if (password !== confirmPassword)
      return res.json(error_res("Passwords do not match!"));

    req.body.password = await bcrypt.hash(password, 10);

    let getAdminByNameAndMobileNum = await adminModel.findOne({
      $and: [{ email: email }, { mobileNumber: mobileNumber }],
    });
    if (getAdminByNameAndMobileNum) {
      return res.json(error_res("This Admin is alredy registered!"));
    }

    let createAdmin = await adminModel.create(req.body);
    return res.json(success_res("Admin Created successfully!", createAdmin));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const postAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const missingField = checkRequiredFields(req.body, [
      "username",
      "password",
    ]);
    if (missingField)
      return res.json(error_res(`Please provide ${missingField}!`));

    let checkAdmin = await adminModel.findOne({
      $or: [{ email: username }, { mobileNumber: username }],
    });

    if (!checkAdmin) {
      return res.json(error_res("Admin not found !"));
    }

    let checkPassword = await bcrypt.compare(password, checkAdmin.password);

    if (!checkPassword) {
      return res.json(error_res("Your password is incorrect !"));
    }

    let token = jwt.sign({ id: checkAdmin._id }, process.env.ADMIN_TOKEN);
    return res.json(success_res("Admin login successully !", token));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const deleteUser = async (req, res) => {
  try {
    let id = req.query.id;
    await userModel.findByIdAndDelete(id);

    return res.json(success_res("User deleted successfully !"));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

module.exports = { postAdmin, postAdminLogin, deleteUser };
