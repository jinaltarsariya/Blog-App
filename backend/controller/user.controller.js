const userModel = require("../model/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const {
  checkRequiredFields,
  error_res,
  isEmailValid,
  mobileNumValidation,
  success_res,
} = require("../library/general");
require("dotenv").config();

const postUser = async (req, res) => {
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
      return res.json(error_res("name must be three characters long !"));
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

    let getUserByNameAndMobileNum = await userModel.findOne({
      $and: [{ email: email }, { mobileNumber: mobileNumber }],
    });
    if (getUserByNameAndMobileNum) {
      return res.json(error_res("This user is alredy registered!"));
    }

    let createUser = await userModel.create(req.body);
    return res.json(success_res("User registration successfully!", createUser));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const postUserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const missingField = checkRequiredFields(req.body, [
      "username",
      "password",
    ]);

    if (missingField)
      return res.json(error_res(`Please provide ${missingField}!`));

    let checkUser = await userModel.findOne({
      $or: [{ email: username }, { mobileNumber: username }],
    });

    if (!checkUser) {
      return res.json(error_res("user not found !"));
    }

    let checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.json(error_res("Your password is incorrect !"));
    }

    let token = jwt.sign({ id: checkUser._id }, process.env.USER_TOKEN);

    return res.json(success_res("User login successully !", token));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

module.exports = { postUser, postUserLogin };
