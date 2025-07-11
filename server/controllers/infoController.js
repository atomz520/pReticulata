const Info = require("../models/Info");

// Add a new info entry
exports.addInfo = async (req, res) => {
  try {
    const { batch, type, born, died, remarks } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const newInfo = new Info({ batch, type, photo, born, died, remarks });
    const savedInfo = await newInfo.save();
    res.json(savedInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save info" });
  }
};

// Get all info entries
exports.getAllInfo = async (req, res) => {
  try {
    const infoList = await Info.find();
    res.json(infoList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch info" });
  }
};

// Optional: Get a single info entry by ID
exports.getInfoById = async (req, res) => {
  try {
    const info = await Info.findById(req.params.id);
    if (!info) return res.status(404).json({ error: "Info not found" });
    res.json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch info by ID" });
  }
};
