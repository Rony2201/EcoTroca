import express from 'express';
import productRegister from '../controllers/productController.js';
const router = express.Router();


router.post("/", productRegister)

export default router;