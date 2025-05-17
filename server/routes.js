const express = require("express");
const db = require("./db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi JZ!");
});

router.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// add login route, with hardcoded email and password
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@rivrmizt.com" && password === "pReticulata") {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// router.post("/upload", (req, res) => {
//   const image = req.body;
//   console.log(image);
//   res.json({ message: "Image uploaded successfully" });
// });

module.exports = router;
