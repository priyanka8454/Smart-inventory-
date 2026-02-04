const router = require("express").Router();
const Log = require("../models/Log");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/", auth, role("admin"), async (req, res) => {
  const logs = await Log.find();
  res.json(logs);
});

module.exports = router;
