const mongoose = require("mongoose");

const movementSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  type: { type: String, enum: ["IN", "OUT"] },
  quantity: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Movement", movementSchema);
