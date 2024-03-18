const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    mobileNumber: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
