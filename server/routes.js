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

module.exports = router;
