const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create (or open) the database
const db = new sqlite3.Database(
  path.resolve(__dirname, "mydatabase.sqlite"),
  (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to SQLite database.");
  }
);

module.exports = db;
