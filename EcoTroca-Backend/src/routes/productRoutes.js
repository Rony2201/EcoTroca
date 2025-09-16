// src/routes/productRoutes.js
import express from "express";
import { 
  productRegister, 
  getAllProductsController, 
  getProductId,
  getProductsByUserId,
  updateProductController,
} from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { enviarProposta } from "../controllers/propostaController.js";

const productRouter = express.Router();

productRouter.post("/product/:id", authenticateToken, productRegister);
productRouter.post("/product", productRegister);

productRouter.get("/product", getAllProductsController);
productRouter.get("/product/:id", getProductId);
productRouter.get("/products/user/:userId", authenticateToken, getProductsByUserId);

productRouter.put("/product/:id", authenticateToken, updateProductController);

productRouter.delete("/product/:id", authenticateToken);



productRouter.post("/proposta/:id", enviarProposta);
export default productRouter;