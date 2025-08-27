import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CategoryModel = {
  // Criar categoria
  create: async (name) => {
    return await prisma.category.create({
      data: { name },
    });
  },

  // Listar todas as categorias
  findAll: async () => {
    return await prisma.category.findMany({
      include: { products: true }, // opcional: traz produtos associados
    });
  },

  // Buscar por ID
  findById: async (id) => {
    return await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  },

  // Atualizar
  update: async (id, name) => {
    return await prisma.category.update({
      where: { id },
      data: { name },
    });
  },

  // Deletar
  delete: async (id) => {
    return await prisma.category.delete({
      where: { id },
    });
  },
};