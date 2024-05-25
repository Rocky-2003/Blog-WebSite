const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");
const route = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}- ${file.originalname}`);
  },
});

const upload = multer({ storage });

route.get("/", async (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

route.post("/addBlog", upload.single("coverImage"), async (req, res) => {
  const { body, title } = req.body;

  const blogData = await Blog.create({
    title,
    body,
    coverImage: `./uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  console.log(blogData);

  return res.redirect("/");
});

module.exports = route;
