const productService = require("../services/productService");

const getAllProducts = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getProductById = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const createProduct = (req, res, next) => {
  try {
    const product = productService.createProduct(req.body);

    res
      .status(201)
      .json({ status: 201, message: "Product created successfully", product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteProduct = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
