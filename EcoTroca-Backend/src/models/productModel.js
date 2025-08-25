import prisma from "../prisma.js";

export const createProduct = async (data) => {
  return prisma.product.create({ data });
};

export const getAllProducts = async () => {
  return prisma.product.findMany();
};
