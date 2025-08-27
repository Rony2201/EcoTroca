import {register} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


export const userRegister = async (req, res) => {
  

  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await register({ email, password: hashedPassword, username });
        const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      user: newUser,
      message: "Usuário criado com sucesso!",
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message || error, message: "Erro ao criar usuário" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await register.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Login bem-sucedido!" });
  } catch (error) {
    res.status(500).json({ error: error.message || error, message: "Erro ao fazer login" });
  }
};
