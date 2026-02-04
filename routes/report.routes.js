const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");

// Low stock
router.get("/low-stock", auth, async (req, res) => {
  const data = await Product.find({ stock: { $lt: 10 } });
  res.json(data);
});

// Total inventory value
router.get("/total-value", auth, async (req, res) => {
  const data = await Product.aggregate([
    { $group: { _id: null, total: { $sum: { $multiply: ["$stock", "$price"] } } } }
  ]);
  res.json(data[0]);
});

// Category-wise stock
router.get("/category", auth, async (req, res) => {
  const data = await Product.aggregate([
    { $group: { _id: "$category", totalStock: { $sum: "$stock" } } }
  ]);
  res.json(data);
});

// Summary (lowStock count, total value, products count)
router.get("/summary", auth, async (req, res) => {
  const products = await Product.find({});
  const productsCount = products.length;
  const lowStock = products.filter(p => (p.stock || 0) <= 5).length;
  const totalValue = products.reduce((s, p) => s + ((p.price || 0) * (p.stock || 0)), 0);
  res.json({ productsCount, lowStock, totalValue });
});

module.exports = router;

