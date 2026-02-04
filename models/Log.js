const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  endpoint: String,
  method: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Log", logSchema);
