import type { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/AuthService.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      ...result,
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};