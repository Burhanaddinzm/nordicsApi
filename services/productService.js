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
