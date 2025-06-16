const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let tasks = [];
let Counter = 1;

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/add", (req, res) => {
  const newTask = {
    id: Counter++,
    text: req.body.task,
  };
  tasks.push(newTask);
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((data) => data.id !== id);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const task = tasks.find((data) => data.id === parseInt(req.params.id));
  if (!task) return res.redirect("/");
  res.render("edit", { task });
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((data) => data.id === id);
  if (task) task.text = req.body.task;
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
