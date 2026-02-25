import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    return;
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não configurado no servidor.');
    }

    const decoded = jwt.verify(token, secret) as unknown as TokenPayload;
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
    return;
  }
};