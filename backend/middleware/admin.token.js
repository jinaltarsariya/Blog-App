const jwt = require("jsonwebtoken");
const { error_res } = require("../library/general");
require("dotenv").config();

const adminToken = async (req, res, next) => {
  try {
    let token = req.headers.token || req.header("Authorization");

    if (!token) {
      return res.json(error_res("token are required !"));
    }

    var decoded = jwt.verify(token, process.env.ADMIN_TOKEN);
    AdminTokenId = decoded.id;
    next();
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

module.exports = { adminToken };
