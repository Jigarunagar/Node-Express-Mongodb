const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("blogs/index", { blogs });
});

router.get("/new", (req, res) => {
  res.render("blogs/new");
});

router.post("/", async (req, res) => {
  await Blog.create(req.body.blog);
  res.redirect("/blogs");
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("blogs/show", { blog });
});

router.get("/:id/edit", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("blogs/edit", { blog });
});

router.put("/:id", async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body.blog);
  res.redirect(`/blogs/${req.params.id}`);
});

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/blogs");
});

module.exports = router;
