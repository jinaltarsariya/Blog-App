const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String },
    image: String,
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
