const { body } = require("express-validator");

const registerValidationRules = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .trim()
      .escape(),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain at least one number"),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password field is required")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ];
};

const loginValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required"),
  ];
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
};
