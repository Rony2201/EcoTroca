import express from "express";
import { productRegister, getAllProductsController } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/product", productRegister);
productRouter.get("/product", getAllProductsController);

export default productRouter;
