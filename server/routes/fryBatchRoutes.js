const express = require("express");
const router = express.Router();
const fryBatchController = require("../controllers/fryBatchController");

// POST /api/fry_batch – create fry batch entry
router.post("/", fryBatchController.addFryBatch);

// GET /api/fry_batch – get all fry batch entries
router.get("/", fryBatchController.getAllFryBatches);

// GET /api/fry_batch/:id – get fry batch entry by ID
router.get("/:id", fryBatchController.getFryBatchById);

module.exports = router;
