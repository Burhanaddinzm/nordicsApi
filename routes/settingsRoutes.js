const express = require("express");

const router = express.Router();
const settingsController = require("../controllers/settingsController");

router.put("/set", settingsController.updateSettings);

module.exports = router;
