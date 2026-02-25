import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (name: string, email: string, passwordRaw: string) => {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordRaw, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (email: string, passwordRaw: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('E-mail ou senha incorretos.');
  }

  const isPasswordValid = await bcrypt.compare(passwordRaw, user.password);

  if (!isPasswordValid) {
    throw new Error('E-mail ou senha incorretos.');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Chave JWT_SECRET não configurada no servidor.');
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    secret,
    { expiresIn: '1d' }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};