import type { Request, Response } from 'express';
import * as ProductService from '../services/ProductService.js';

export const create = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({
      message: 'Produto cadastrado com sucesso!',
      product
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string; 
    const products = await ProductService.getProducts(category);

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro interno ao buscar produtos.' });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'ID do produto é obrigatório.' });
      return;
    }
    
    const product = await ProductService.getProductById(id);

    if (!product) {
      res.status(404).json({ error: 'Produto não encontrado.' });
      return;
    }

    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao buscar o produto.' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'ID do produto é obrigatório.' });
      return;
    }
    
    await ProductService.deleteProduct(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: 'Erro ao deletar produto ou produto inexistente.' });
  }
};