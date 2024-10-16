const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getAzTime } = require("../utils/dateTimeUtils");
const { throwErrorWithStatusCode } = require("../utils/errorUtils");

const getAllProducts = async () => {
  return await prisma.product.findMany({
    where: {
      isDeleted: false,
    },
  });
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
      isDeleted: false,
    },
  });

  if (!product) {
    throwErrorWithStatusCode(404, "Product not found");
  }

  return product;
};

const createProduct = async (productData) => {
  const { name, price } = productData;

  const file = productData.file;
  const imagePath = `/uploads/${file.filename}`;

  if (!file) {
    throwErrorWithStatusCode(400, "Product image is required.");
  }

  const product = {
    name,
    price,
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
