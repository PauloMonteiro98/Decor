import prisma from '../config/prisma.js';

interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock?: number;
  imageUrl?: string;
}

export const createProduct = async (data: ProductData) => {
  const product = await prisma.product.create({
    data: {
      ...data,
    },
  });
  return product;
};

export const getProducts = async (category?: string) => {
  if (category) {
    return await prisma.product.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' }
    });
  }
  
  return await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

};

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};