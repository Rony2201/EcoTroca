import express from 'express';
import userRegister from '../controllers/registerController.js';
const router = express.Router();

router.post('/', userRegister);

export default router;