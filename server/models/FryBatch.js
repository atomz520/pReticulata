const mongoose = require("mongoose");

const fryBatchSchema = new mongoose.Schema({
  parent_m: String,
  parent_f: String,
  date_dropped: String,
  number_d: Number,
  number_1m: Number,
  number_2m: Number,
  number_m: Number,
  number_f: Number,
});

module.exports = mongoose.model("FryBatch", fryBatchSchema);
