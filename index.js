const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const connection = require("./connection.js");
const {checkForAuthenticationCookie} = require("./middlewares/authenticat.js");

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
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie("token"));
app.use("/user", userRoute);

app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

app.listen(PORT, () => console.log("Server is Started: 8001"));
