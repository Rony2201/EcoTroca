import express from "express";
import { productRegister, getAllProductsController, getProductId } from "../controllers/productController.js";
import { updateProducts } from "../models/productModel.js";

const productRouter = express.Router();

productRouter.post("/product", productRegister);
productRouter.get("/product", getAllProductsController);
productRouter.get("/product/:id", getProductId);
productRouter.put("/product/:id", updateProducts)

export default productRouter;
