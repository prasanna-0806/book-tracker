# 📚 Book Tracker

A personal reading tracker inspired by Derek Sivers’ book notes — built as a full-stack capstone project using **Node.js, Express, PostgreSQL, EJS, and Axios**.

Easily track the books you've read, write notes, give ratings, and fetch beautiful cover images using ISBNs via the Open Library API.

---

## ✨ Features

- ✅ Add books with title, author, rating, notes, and date read  
- 🖼 Fetch book covers using Open Library Covers API  
- 📝 Edit or delete any book entry  
- 📦 Store all book info using PostgreSQL  
- 🎨 Pastel-colored, clean user interface  
- 📅 Date input and formatting  
- 🔄 Pre-filled forms when editing  

---

## 💻 Technologies Used

- Node.js  
- Express.js  
- PostgreSQL  
- pg (node-postgres)  
- Axios  
- EJS  
- HTML + CSS (with Google Fonts)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

To get started, first clone this repository to your local machine using:

    git clone https://github.com/prasanna-0806/book-tracker.git
    cd book-tracker

---

### 2️⃣ Install dependencies

Make sure Node.js is installed on your system.

Then install all required npm packages by running:

    npm install

This will install:
- express  
- pg  
- ejs  
- axios  
- dotenv  
- nodemon (optional, for development)

---

### 3️⃣ Create PostgreSQL database

Make sure PostgreSQL is installed and running locally.

1. Open pgAdmin or your terminal  
2. Create a database named `books`  
3. Run this SQL inside that database:

    CREATE TABLE books (
      id SERIAL PRIMARY KEY,
      title TEXT,
      author TEXT,
      rating INTEGER,
      date_read DATE,
      notes TEXT,
      isbn TEXT,
      cover_url TEXT
    );

---

### 4️⃣ Set up environment variables

Create a `.env` file in the root directory of the project and add:

    PGUSER=your_postgres_username
    PGHOST=localhost
    PGDATABASE=books
    PGPASSWORD=your_postgres_password
    PGPORT=5432

Make sure `.env` is listed in `.gitignore` so it doesn't get pushed to GitHub.

---

### 5️⃣ Run the application

To start the server, run:

    nodemon index.js

Then open your browser and go to:

    http://localhost:3000

You can now view, add, edit, and delete books from your reading list!

---

## 🔢 Sample ISBNs to Try

Use these ISBNs to test fetching book covers:

| 📘 Book Title               | ISBN           |
|----------------------------|----------------|
| Atomic Habits              | 9780735211292  |
| The Alchemist              | 9780061122415  |
| Deep Work                  | 9781455586691  |

---

## 🎨 Design System

### 🎨 Color Palette

The site uses a soft pastel color scheme:

- `#FFDCDC` – soft pink  
- `#FFE8CD` – creamy peach  
- `#FFF2EB` – warm beige  
- `#FFD6BA` – light coral  

---

### 🔤 Fonts

Google Fonts used:

- **Headings** – Playfair Display  
- **Body** – Nunito  

Import them with this HTML:

    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">

---

## 📁 Folder Structure

    book-tracker/
    ├── public/
    │   └── styles.css
    ├── views/
    │   ├── index.ejs
    │   ├── add.ejs
    │   └── edit.ejs
    ├── index.js
    ├── package.json
    ├── .env         ← not committed to GitHub
    ├── .gitignore
    └── README.md

---
## 🙋‍♀️ Author

**Prasanna RDL**  
Built as part of a full-stack development capstone project 🚀

---

## 📜 License

License — free to use, modify, and share with credit.
