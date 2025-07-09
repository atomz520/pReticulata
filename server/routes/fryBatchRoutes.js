const express = require("express");
const router = express.Router();
const fryBatchController = require("../controllers/fryBatchController");

router.post("/", fryBatchController.addFryBatch);

module.exports = router;
