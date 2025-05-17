const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const db = require("./database");
const { v4: uuidv4 } = require("uuid");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/**
 * Add a new Guppy (Info table)
 */
app.post("/api/info", upload.single("photo"), (req, res) => {
  const id = uuidv4();
  const { batch, type, born, died, remarks } = req.body;
  // const photo = `/uploads/${req.file.filename}`;
  const photo = "aasd";

  db.run(
    `
    INSERT INTO Info (id, batch, type, photo, born, died, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    [id, batch, type, photo, born, died, remarks],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({
          id,
          batch,
          type,
          photo,
          born,
          died,
          remarks,
        });
      }
    }
  );
});

/**
 * Add a new Fry Batch (Fry_batches table)
 */
app.post("/api/fry_batch", (req, res) => {
  const id = uuidv4();
  const {
    parent_m,
    parent_f,
    date_dropped,
    number_d,
    number_1m,
    number_2m,
    number_m,
    number_f,
  } = req.body;

  db.run(
    `
    INSERT INTO Fry_batches (id, parent_m, parent_f, date_dropped, number_d, number_1m, number_2m, number_m, number_f)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      id,
      parent_m,
      parent_f,
      date_dropped,
      number_d,
      number_1m,
      number_2m,
      number_m,
      number_f,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({
          id,
          parent_m,
          parent_f,
          date_dropped,
          number_d,
          number_1m,
          number_2m,
          number_m,
          number_f,
        });
      }
    }
  );
});

app.listen(5001, () => console.log("Server running on port 5001"));
