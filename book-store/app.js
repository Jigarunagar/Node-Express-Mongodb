const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Book data in memory
let books = [
  { id: 1, title: "Learn Node.js", author: "John Doe", price: 499 },
  { id: 2, title: "Mastering JavaScript", author: "Jane Smith", price: 599 }
];

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes

// Home - Show book list
app.get("/", (req, res) => {
  res.render("index", { books: books });
});

// Add book
app.post("/add", (req, res) => {
  const { title, author, price } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    price: parseFloat(price)
  };
  books.push(newBook);
  res.redirect("/");
});

// REST API - Get books as JSON
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Book store app running at http://localhost:${PORT}`);
});
