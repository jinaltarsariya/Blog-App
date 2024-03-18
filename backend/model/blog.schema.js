const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    title: { type: String },
    discription: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blog", blogSchema);
module.exports = blogModel;
