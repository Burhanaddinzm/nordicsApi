const { body } = require("express-validator");

const createValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ max: 100 })
      .withMessage("Name must not exceed 100 characters")
      .trim()
      .escape(),

    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isDecimal({ decimal_digits: "2" })
      .withMessage("Price must be a decimal with two digits")
      .custom((value) => parseFloat(value) >= 0)
      .withMessage("Price must be a positive number"),
  ];
};

module.exports = { createValidationRules };
