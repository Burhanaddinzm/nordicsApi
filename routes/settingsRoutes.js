const express = require("express");

const router = express.Router();
const settingsController = require("../controllers/settingsController");

router.get("/", settingsController.getSettings);
router.put("/set", settingsController.updateSettings);

module.exports = router;
