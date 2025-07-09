const Info = require("../models/Info");

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
