const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middlewares/validationMiddleware");
const {
  registerValidationRules,
  loginValidationRules,
} = require("../validations/authValidation");

const router = express.Router();

router.post(
  "/register",
  registerValidationRules(),
  validate,
  authController.register
);

router.post(
  "/login",
  loginValidationRules(),
  validate,
  authController.login
);

module.exports = router;
