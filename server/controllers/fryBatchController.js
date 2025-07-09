const FryBatch = require("../models/FryBatch");

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
