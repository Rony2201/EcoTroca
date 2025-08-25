import prisma from "../prisma.js";

const createProduct = async (data) => {
  return prisma.product.create({
    data
  });
};

export default createProduct;
