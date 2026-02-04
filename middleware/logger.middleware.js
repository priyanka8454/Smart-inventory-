const Log = require("../models/Log");

module.exports = async (req, res, next) => {
  if (req.user) {
    await Log.create({
      userId: req.user.id,
      endpoint: req.originalUrl,
      method: req.method
    });
  }
  next();
};
