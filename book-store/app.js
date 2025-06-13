const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let books = [
  { id: 1, title: "Learn Node.js", author: "John Doe", price: 499 },
  { id: 2, title: "Mastering JavaScript", author: "Jane Smith", price: 599 }
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("index", { books: books });
});

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

app.get("/api/books", (req, res) => {
  res.json(books);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Book store app running at http://localhost:${PORT}`);
});
