import { createProduct, getAllProducts, getProductById } from "../models/productModel.js";

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

export const updateProducts = async (req, res) => {
  const id = req.params.id;
  const { data } = req.body;

  try {
    const updateProduct = await updateProducts({ id, data});
    res.status(201).json({ product: updateProduct, message: "Produto editado com sucesso!"});
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
