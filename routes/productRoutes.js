const express = require("express");
const productController = require("../controllers/productController");
const { createValidationRules } = require("../validations/productValidation");
const validate = require("../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post(
  "/create",
  createValidationRules(),
  validate,
  productController.createProduct
);

module.exports = router;
