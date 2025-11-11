import { prisma } from '../db/prisma.js';

export const fetchProducts = async () => {
  return await prisma.product.findMany({
    include: { category: true, wholesaler: true },
  });
};

export const fetchProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true, wholesaler: true },
  });
};

export const addProduct = async (data: any) => {
  return await prisma.product.create({
    data,
  });
};

export const updateProduct = async (id: string, data: any) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};

export const updateProductStock = async (id: string, stock: number) => {
  return await prisma.product.update({
    where: { id },
    data: { stock },
  });
};

export const calculateProductMargin = (sellingPrice: number, buyingCost: number) => {
  if (buyingCost === 0) return 0;
  return ((sellingPrice - buyingCost) / buyingCost * 100);
};

export const getLowStockProducts = async (threshold: number = 5) => {
  return await prisma.product.findMany({
    where: {
      stock: {
        lte: threshold,
      },
    },
    include: { category: true, wholesaler: true },
  });
};

export const getProductsByCategory = async (categoryId: string) => {
  return await prisma.product.findMany({
    where: { categoryId },
    include: { category: true, wholesaler: true },
  });
};
