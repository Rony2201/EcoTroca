import express from 'express';
import {userLogin, userRegister} from '../controllers/registerController.js';
import { authenticateToken } from '../middlewares/auth.js';
const routerRegister = express.Router();

routerRegister.post('/register', userRegister);
routerRegister.post('/login', authenticateToken, userLogin)

export default routerRegister;