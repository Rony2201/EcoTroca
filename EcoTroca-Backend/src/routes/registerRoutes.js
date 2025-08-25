import express from 'express';
import userRegister from '../controllers/registerController.js';
const routerRegister = express.Router();

routerRegister.post('/', userRegister);

export default routerRegister;