const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )
`);

// Create Info Table
db.run(`
  CREATE TABLE IF NOT EXISTS Info (
    id TEXT PRIMARY KEY,
    batch TEXT,
    type TEXT,
    photo TEXT,
    born DATE,
    died DATE,
    remarks TEXT
  )
`);

// Create Fry_batches Table
db.run(`
  CREATE TABLE IF NOT EXISTS Fry_batches (
    id TEXT PRIMARY KEY,
    parent_m TEXT,
    parent_f TEXT,
    date_dropped DATE,
    number_d INTEGER,
    number_1m INTEGER,
    number_2m INTEGER,
    number_m INTEGER,
    number_f INTEGER
  )
`);

module.exports = db;
