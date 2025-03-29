const express = require("express");
const db = require("./db");
const app = express();
const router = require("./routes");

app.use(express.json());
app.use("/", router);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )
`);


const PORT = 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
