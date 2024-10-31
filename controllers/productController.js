const productService = require("../services/productService");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();

    if (products.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Products not found",
      });
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
    const body = req.body;
    const file = req.file;

    const product = await productService.createProduct(body, file);
    const { id, name, price, image, createdAt } = product;

    res.status(201).json({
      status: 201,
      message: "Product created successfully",
      data: { id, name, price, image, createdAt },
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const file = req.file;

    const product = await productService.updateProduct({ id, ...body }, file);
    const { name, price, image, updatedAt } = product;

    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: { id, name, price, image, updatedAt },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);

    res.sendStatus(204);
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
