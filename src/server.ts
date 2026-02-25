import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API do E-commerce rodando com TypeScript!' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});