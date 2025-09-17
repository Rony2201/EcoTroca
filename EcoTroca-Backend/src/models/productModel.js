// src/models/productModel.js
import prisma from "../prisma.js";

export const createProduct = async (data) => {
  return prisma.product.create({
    data: data
  });
}

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id_product: parseInt(id) }
  })
}

export const updateProducts = async (id, updateData) => {
  return prisma.product.update({
    where: { id_product: Number(id) },
    data: updateData,
  });
}

// Model para buscar produtos de um usuário específico
export const getProductsByUserId = async (userId) => {
  const products = await prisma.product.findMany({
    where: {
      ownerId: userId,
    },
  });
  return products;
}