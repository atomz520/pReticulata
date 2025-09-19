require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());

// --- MongoDB Connection ---
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pReticulata", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB: pReticulata");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop app if DB fails
  }
}
connectDB();

// --- Example Schema & Model ---
const FryBatch = mongoose.model("FryBatch", {
  date: String,
  notes: String,
});

// --- Routes ---
app.post("/batches", async (req, res) => {
  try {
    const batch = new FryBatch(req.body);
    await batch.save();
    res.status(201).send(batch);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get("/batches", async (req, res) => {
  try {
    const batches = await FryBatch.find();
    res.send(batches);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// --- Start Server ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
