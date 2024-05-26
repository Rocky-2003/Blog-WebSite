const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog.js");
const User = require("./models/user.js");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog.js");
const connection = require("./connection.js");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authenticat.js");

const app = express();
const PORT = 8001;

connection("mongodb://localhost:27017/practice-blog")
  .then(() => console.log("DataBase is Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  if (req.user) {
    const userId = req.user._id;
    const blogs = await Blog.find({ createdBy: userId });

    return res.render("home", {
      user: req.user,
      blogs: blogs,
    });
  }
  return res.render("home");
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.listen(PORT, () => console.log("Server is Started: 8001"));
