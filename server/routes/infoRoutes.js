const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const infoController = require("../controllers/infoController");

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST /api/info – create info entry
router.post("/", upload.single("photo"), infoController.addInfo);

// GET /api/info – get all info entries
router.get("/", infoController.getAllInfo);

// GET /api/info/:id – get specific info entry by ID
router.get("/:id", infoController.getInfoById);

module.exports = router;
