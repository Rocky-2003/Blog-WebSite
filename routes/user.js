const { Router } = require("express");

const User = require("../models/user");

const router = Router();

router.get("/signin", async (req, res) => {
  return res.render("signin");
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndCreateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Invalid email or password!",
    });
  }
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  await User.create({
    email,
    password,
    fullName,
  });

  return res.redirect("/user/signin");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
