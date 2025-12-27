const express = require("express");
const router = express.Router();

// TEMP Fake Response — No DB Needed Yet
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Stories feature coming soon 🚀",
  });
});

module.exports = router;
