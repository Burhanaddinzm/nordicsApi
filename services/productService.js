const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
      id: id,
      isDeleted: false,
    },
  });

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;

    throw error;
  }

  return product;
};
