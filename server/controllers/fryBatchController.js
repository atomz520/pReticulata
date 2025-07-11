const FryBatch = require("../models/FryBatch");

// Add a new fry batch
exports.addFryBatch = async (req, res) => {
  try {
    const fryBatch = new FryBatch(req.body);
    const savedBatch = await fryBatch.save();
    res.json(savedBatch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save fry batch" });
  }
};

// Get all fry batch entries
exports.getAllFryBatches = async (req, res) => {
  try {
    const batches = await FryBatch.find();
    res.json(batches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch fry batches" });
  }
};

// Optional: Get fry batch by ID
exports.getFryBatchById = async (req, res) => {
  try {
    const batch = await FryBatch.findById(req.params.id);
    if (!batch) return res.status(404).json({ error: "Fry batch not found" });
    res.json(batch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch fry batch by ID" });
  }
};
