const jwt = require("jsonwebtoken");
const { error_res } = require("../library/general");
require("dotenv").config();

const userToken = async (req, res, next) => {
  try {
    let token = req.headers.token;

    if (!token) {
      return res.json(error_res("token required !"));
    }

    var decoded = jwt.verify(token, process.env.USER_TOKEN);

    userId = decoded.id;
    console.log("userId --> ", userId);
    next();
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

module.exports = { userToken };
