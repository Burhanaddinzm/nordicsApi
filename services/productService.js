const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getAzTime } = require("../utils/dateTimeUtils");
const { throwErrorWithStatusCode } = require("../utils/errorUtils");

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
      id: Number(id),
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  // updateProduct,
  // deleteProduct,
};
