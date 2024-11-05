const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getAllProducts, seedProducts } = require("./productService");

(async () => {
  const seedCarouselProducts = async () => {
    const productsSeeded = await seedProducts();
    if (!productsSeeded) return;

    const products = await getAllProducts();

    // Map products to format required for 'connect'
    const productConnections = products.map((product) => ({
      id: product.id,
    }));

    // Upsert a Settings record with connected carousel products
    await prisma.settings.upsert({
      where: { id: 1 },
      update: {
        carouselProducts: {
          connect: productConnections,
        },
      },
      create: {
        aboutText: "Default About Text",
        carouselProducts: {
          connect: productConnections,
        },
      },
    });
  };

  await seedCarouselProducts();
})();
