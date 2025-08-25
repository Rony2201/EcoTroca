import createProduct from "../models/productModel.js";

const productRegister = async (req, res) => {
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

export default productRegister;
