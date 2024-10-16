const productService = require("../services/productService");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();

    if (products.length === 0) {
      res.status(404).json({ status: 404, message: "Products not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Products found successfully",
      data: { ...products },
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    res.status(200).json({
      status: 200,
      message: "Product found successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      status: 201,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
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
