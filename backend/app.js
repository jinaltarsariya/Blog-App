var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const adminRoute = require("./routes/admin.route");
var userRoutes = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const blogRoute = require("./routes/blog.route");
var indexRouter = require("./routes/index");

mongoose
  .connect(process.env.DATABASED_CONNECTION + "Blog_api")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoute);
app.use("/user", userRoutes);
app.use("/category", categoryRoute);
app.use("/blog", blogRoute);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
