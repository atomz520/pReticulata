const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  batch: String,
  type: String,
  photo: String,
  born: String,
  died: String,
  remarks: String,
});

module.exports = mongoose.model("Info", infoSchema);
