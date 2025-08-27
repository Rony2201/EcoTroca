import { CategoryModel } from "../models/categoryModel.js";

// Criar categoria
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O campo 'name' é obrigatório" });
    }

    const category = await CategoryModel.create(name);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({
      error: "Erro ao criar categoria",
      details: error.message,
    });
  }
};

// Listar todas
export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar categorias" });
  }
};

// Buscar por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(Number(id));

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

// Atualizar
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O campo 'name' é obrigatório" });
    }

    const category = await CategoryModel.update(Number(id), name);
    res.json(category);
  } catch (error) {
    res.status(400).json({
      error: "Erro ao atualizar categoria",
      details: error.message,
    });
  }
};

// Deletar
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await CategoryModel.delete(Number(id));
    res.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    res.status(400).json({
      error: "Erro ao deletar categoria",
      details: error.message,
    });
  }
};