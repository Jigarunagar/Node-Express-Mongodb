const express = require("express");
const methodOverride = require("method-override");
const blogRoutes = require("./routes/blogs");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
