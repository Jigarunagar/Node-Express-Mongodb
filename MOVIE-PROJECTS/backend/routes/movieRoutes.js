const express = require("express");
const Movie = require("../models/Movie");
const jwt = require("jsonwebtoken");
const router = express.Router();

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token missing");

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return res.status(403).send("Invalid Token");
    req.userId = data.id;
    next();
  });
}

router.post("/", authMiddleware, async (req, res) => {
  const { title, description, rating, review } = req.body;
  const movie = await Movie.create({
    title,
    description,
    rating,
    review,
    user: req.userId,
  });
  res.json(movie);
});

router.get("/", async (req, res) => {
  const movies = await Movie.find().populate("user", "username");
  res.json(movies);
});

module.exports = router;
