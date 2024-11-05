const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getAzTime } = require("../utils/dateTimeUtils");
const { throwErrorWithStatusCode } = require("../utils/errorUtils");
const { deleteImage } = require("../utils/fileUtils");

const getAllProducts = async () => {
  return await prisma.product.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      createdAt: true,
    },
  });
};

const getProductById = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    throwErrorWithStatusCode(400, "Invalid ID format");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      createdAt: true,
    },
  });

  if (!product) {
    throwErrorWithStatusCode(404, "Product not found");
  }

  return product;
};

const createProduct = async (productData, productImage) => {
  const { name, price } = productData;

  if (!productImage) {
    throwErrorWithStatusCode(400, "Image is required");
  }
  const imagePath = `/uploads/${productImage.filename}`;

  const product = {
    name,
    price: parseFloat(price),
    image: imagePath,
    createdAt: getAzTime(),
  };

  return await prisma.product.create({
    data: product,
  });
};

const updateProduct = async (productData, productImage) => {
  const { id, name, price } = productData;

  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    throwErrorWithStatusCode(400, "Invalid ID format");
  }

  const existingProduct = await getProductById(parseInt(id));
  if (!existingProduct) throwErrorWithStatusCode(404, "Product not found");

  const product = {
    name,
    price: parseFloat(price),
    updatedAt: getAzTime(),
  };

  if (productImage) {
    deleteImage(existingProduct.image);
    const imagePath = `/uploads/${productImage.filename}`;
    product.image = imagePath;
  }

  return await prisma.product.update({
    where: { id: parseInt(id), isDeleted: false },
    data: product,
  });
};

const deleteProduct = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    throwErrorWithStatusCode(400, "Invalid ID format");
  }

  const existingProduct = await getProductById(parseInt(id));
  if (!existingProduct) throwErrorWithStatusCode(404, "Product not found");

  await prisma.product.update({
    where: { id: parseInt(id), isDeleted: false },
    data: { isDeleted: true },
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
