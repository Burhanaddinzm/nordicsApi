const express = require("express");
const productController = require("../controllers/productController");
const {
  createValidationRules,
  updateValidationRules,
} = require("../validations/productValidation");
const validate = require("../middlewares/validationMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const authenticate = require("../middlewares/authenticationMiddleware");
const authorize = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post(
  "/create",
  authenticate,
  authorize("ADMIN"),
  uploadMiddleware,
  createValidationRules(),
  validate,
  productController.createProduct
);

router.put(
  "/update/:id",
  authenticate,
  authorize("ADMIN"),
  uploadMiddleware,
  updateValidationRules(),
  validate,
  productController.updateProduct
);

router.delete(
  "/delete/:id",
  authenticate,
  authorize("ADMIN"),
  productController.deleteProduct
);

module.exports = router;
