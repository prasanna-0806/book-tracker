import express from 'express';
import axios from 'axios';
import pg from 'pg';

const port = 3000;
const app = express();  

const db= new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "books",
    password: "pgsql",
    port: 5432  
});    
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  const { title, author, isbn, rating, notes, date_read } = req.body;

  let cover_url = null;

  if (isbn) {
    const testUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

    try {
      // Use Axios to check if the image exists
      const response = await axios.head(testUrl);
      if (response.status === 200) {
        cover_url = testUrl;
      }
    } catch (err) {
      console.warn(`⚠️ Cover not found for ISBN: ${isbn}`);
      // Don't assign cover_url, it stays null
    }
  }

  try {
    await db.query(
      "INSERT INTO books (title, author, isbn, rating, notes, date_read, cover_url) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [title, author, isbn, rating, notes, date_read, cover_url]
    );
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error inserting book:", err);
    res.send("❌ Could not add book.");
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY date_read DESC");
    res.render("index", { books: result.rows });
  } catch (err) {
    console.error("❌ Error fetching books:", err);
    res.send("Error loading homepage.");
  }
});

app.get("/edit/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [bookId]);
    const book = result.rows[0];
    res.render("edit", { book });
  } catch (err) {
    console.error("❌ Error loading edit form:", err);
    res.send("Error loading edit form.");
  }
});

app.post("/edit/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, author, isbn, rating, notes, date_read } = req.body;

  let cover_url = null;
  if (isbn) {
    const testUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    try {
      const response = await axios.head(testUrl);
      if (response.status === 200) {
        cover_url = testUrl;
      }
    } catch (err) {
      console.warn(`⚠️ Cover not found for ISBN: ${isbn}`);
    }
  }

  try {
    await db.query(
      `UPDATE books
       SET title = $1, author = $2, isbn = $3, rating = $4, notes = $5, date_read = $6, cover_url = $7
       WHERE id = $8`,
      [title, author, isbn, rating, notes, date_read, cover_url, bookId]
    );
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error updating book:", err);
    res.send("Error updating book.");
  }
});

app.post("/delete/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [bookId]);
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error deleting book:", err);
    res.send("Error deleting book.");
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});