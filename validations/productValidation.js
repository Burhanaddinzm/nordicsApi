const { body } = require("express-validator");

const createValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required").trim().escape(),

    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isDecimal({ decimal_digits: 2 })
      .withMessage("Price must be a decimal with two digits"),
  ];
};

module.exports = { createValidationRules };
