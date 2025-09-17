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
import {
  enviarProposta,
  getReceivedProposals,
  getSentProposals,
} from "../controllers/propostaController.js";

const productRouter = express.Router();


productRouter.post("/product", authenticateToken, productRegister);

productRouter.get("/product", getAllProductsController);
productRouter.get("/product/:id", getProductId);
productRouter.get(
  "/products/user/:userId",
  authenticateToken,
  getProductsByUserId
);

productRouter.put("/product/:id", authenticateToken, updateProductController);

productRouter.delete("/product/:id", authenticateToken);

productRouter.post("/proposta/:id", enviarProposta);
productRouter.get(
  "/proposals/received/:userId",
  authenticateToken,
  getReceivedProposals
);
productRouter.get(
  "/proposals/sent/:userId",
  authenticateToken,
  getSentProposals
);
export default productRouter;
