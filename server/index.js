const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");

const db = require("./db");
const router = require("./routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3001, () => console.log("Server started on port 3001"));

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )
`);

// const PORT = 3001;
// app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
