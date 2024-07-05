const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const userRouter = require("./routers/user");
const blogRoute = require("./routers/blog");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const app = express();
const port = 5000;
const Blog = require("./models/blog");

// MONGO DB CONNECTION ----------------------

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("Mongo DB connected"));

//** MIDDLEWARE  -------------------------------------

app.use(express.static(path.resolve("./public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

//** SETUP VIEW ENGINE -----------------------------------

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//** HANDLE ROUTER ----------------------------------

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blog: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRoute);

//** SERVER CONNECT ---------------------------------

app.listen(port, () => {
  console.log(`Server Connected ${port}`);
});
