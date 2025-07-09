const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const infoController = require("../controllers/infoController");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/", upload.single("photo"), infoController.addInfo);

module.exports = router;
