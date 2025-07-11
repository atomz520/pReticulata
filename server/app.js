require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const mongoURI = process.env.MONGO_URI;
const infoRoutes = require("./routes/infoRoutes");
const fryBatchRoutes = require("./routes/fryBatchRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/info", infoRoutes);
app.use("/api/fry_batch", fryBatchRoutes);

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5001, "0.0.0.0", () =>
      console.log("Server running on port 5001")
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
