const settingsService = require("../services/settingsService");

const updateSettings = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getSettings = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: "Settings found successfully",
      data: await settingsService.getSettings(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateSettings, getSettings };
