const express = require("express");
const productController = require("../controllers/productController");
const {
  createValidationRules,
  updateValidationRules,
} = require("../validations/productValidation");
const validate = require("../middlewares/validationMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post(
  "/create",
  uploadMiddleware,
  createValidationRules(),
  validate,
  productController.createProduct
);

router.put(
  "/update/:id",
  uploadMiddleware,
  updateValidationRules(),
  validate,
  productController.updateProduct
);

router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
