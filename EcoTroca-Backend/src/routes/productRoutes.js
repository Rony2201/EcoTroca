import express from "express";
import { productRegister, getAllProductsController, getProductId } from "../controllers/productController.js";
import { updateProducts } from "../models/productModel.js";
import { authenticateToken } from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.post("/product", productRegister);
productRouter.get("/product", getAllProductsController);
productRouter.get("/product/:id", getProductId);
productRouter.put("/product/:id", authenticateToken, updateProducts)
productRouter.delete("/product/:id", authenticateToken);

export default productRouter;
