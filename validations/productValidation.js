const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ max: 100 })
      .withMessage("Name must not exceed 100 characters")
      .trim()
      .escape()
      .custom(async (value) => {
        const existingRecord = await prisma.product.findFirst({
          where: {
            name: value,
            isDeleted: false,
          },
        });
        if (existingRecord) {
          throw new Error("Name already exists");
        }
        return true;
      }),

    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isDecimal({ decimal_digits: "2" })
      .withMessage("Price must be a decimal with two digits")
      .custom((value) => parseFloat(value) >= 0)
      .withMessage("Price must be a positive number"),
  ];
};

const updateValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ max: 100 })
      .withMessage("Name must not exceed 100 characters")
      .trim()
      .escape()
      .custom(async (value, { req }) => {
        const existingRecord = await prisma.product.findFirst({
          where: {
            id: parseInt(req.params.id),
            isDeleted: false,
          },
        });
        const productWithSameName = await prisma.product.findFirst({
          where: {
            name: value,
            id: { not: parseInt(req.params.id) },
            isDeleted: false,
          },
        });
        if (productWithSameName && existingRecord) {
          throw new Error("Name already exists");
        }
        return true;
      }),

    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isDecimal({ decimal_digits: "2" })
      .withMessage("Price must be a decimal with two digits")
      .custom((value) => parseFloat(value) >= 0)
      .withMessage("Price must be a positive number"),
  ];
};

module.exports = { createValidationRules, updateValidationRules };
