import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const register = async (data) => {
  // A senha já vem hasheada do controller, então a usamos diretamente.
  return prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });
};

export const login = async (data) => {
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: "1h",
  });

  return { token };
};

export const findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email: email },
  });
};
