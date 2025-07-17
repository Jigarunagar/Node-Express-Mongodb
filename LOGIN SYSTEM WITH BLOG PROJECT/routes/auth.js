const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({ username, email, password });
  res.redirect("/auth/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("Invalid credentials");
  }
  req.session.userId = user._id;
  res.redirect("/dashboard");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/auth/login"));
});

module.exports = router;
