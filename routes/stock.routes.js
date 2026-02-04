const router = require("express").Router();
const Product = require("../models/Product");
const Movement = require("../models/Movement");
const auth = require("../middleware/auth.middleware");

// Stock IN
router.post("/in", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  product.stock += quantity;
  await product.save();

  await Movement.create({ productId, type: "IN", quantity });
  res.json(product);
});

// Stock OUT
router.post("/out", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);

  if (product.stock < quantity)
    return res.status(400).json({ msg: "Not enough stock" });

  product.stock -= quantity;
  await product.save();

  await Movement.create({ productId, type: "OUT", quantity });
  res.json(product);
});

module.exports = router;
