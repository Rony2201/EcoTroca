import express from 'express';
import {userLogin, userRegister} from '../controllers/registerController.js';
const routerRegister = express.Router();

routerRegister.post('/register', userRegister);
routerRegister.post('/login', userLogin)

export default routerRegister;