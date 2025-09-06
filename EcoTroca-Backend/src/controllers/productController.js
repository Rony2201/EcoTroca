// src/controllers/productController.js
import { 
  createProduct, 
  getAllProducts, 
  getProductById,
  updateProducts,
} from "../models/productModel.js";
import prisma from "../prisma.js";

export const productRegister = async (req, res) => {
  const { title, description, condition, status, imageUrl, city, district, address, ownerId, categoryId } = req.body;

  try {
    const newProduct = await createProduct({
      title,
      description,
      condition,
      status,
      imageUrl,
      city,
      district,
      address,
      ownerId,
      categoryId
    });

    res.status(201).json({ product: newProduct, message: "Produto criado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: error.message, message: "Erro ao criar produto" });
  }
};

export const updateProductController = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const updatedProduct = await updateProducts(id, updateData);
    res.status(200).json({ product: updatedProduct, message: "Produto editado com sucesso!"});
  } catch(error) {
    console.error("Erro ao editar produto:", error);
    res.status(500).json({error: error.message, message: "Erro ao editar produto"});
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({ products, message: "Todos os produtos encontrados com sucesso!" });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: error.message, message: "Erro ao buscar produtos" });
  }
};

export const getProductId = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await getProductById(id)
    res.status(200).json({product, message: "Produto encontrado!"});
  } catch(error) {
    console.error("Erro ao encontrar produto: ", error);
    res.status(500).json({error: error.message, message: "Erro ao encontrar produto"});
  }
}

// Controller para buscar produtos de um usuário específico
export const getProductsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Converte o userId para um número, pois ele vem como string da URL
    const id = parseInt(userId);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de usuário inválido." });
    }

    // Busca os produtos onde o 'ownerId' é igual ao 'id' do usuário
    const products = await prisma.product.findMany({
      where: {
        ownerId: id,
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos do usuário:', error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};