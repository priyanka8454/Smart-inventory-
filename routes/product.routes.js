const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

// Create
router.post("/", auth, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

// Delete (admin only)
router.delete("/:id", auth, role("admin"), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// Get all + search + pagination
router.get("/", auth, async (req, res) => {
  const { page = 1, search = "", limit: limitQ } = req.query;
  // allow client to request a larger limit for dashboards, default to 1000
  const limit = Number(limitQ) || 1000;

  const products = await Product.find({
    name: { $regex: search, $options: "i" }
  })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(products);
});

module.exports = router;
