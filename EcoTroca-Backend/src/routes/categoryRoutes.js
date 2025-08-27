import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// CRUD de categorias
router.post("/", createCategory);      // Criar
router.get("/", getCategories);        // Listar todas
router.get("/:id", getCategoryById);   // Buscar por ID
router.put("/:id", updateCategory);    // Atualizar
router.delete("/:id", deleteCategory); // Deletar

export default router;