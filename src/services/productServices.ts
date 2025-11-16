import { prisma } from '../db/prisma.js';

export const fetchProducts = async () => {
  return await prisma.product.findMany({
    include: { category: true, wholesaler: true, variants: { include: { batches: true } } },
  });
};

export const fetchProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true, wholesaler: true, variants: { include: { batches: true } } },
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

export const getLowStockProducts = async (threshold: number = 3) => {
  return await prisma.product.findMany({
    where: {
      stock: {
        lt: threshold,
      },
    },
    include: { category: true, wholesaler: true, variants: { include: { batches: true } } },
  });
};

export const getProductsByCategory = async (categoryId: string) => {
  return await prisma.product.findMany({
    where: { categoryId },
    include: { category: true, wholesaler: true, variants: { include: { batches: true } } },
  });
};

// Variant functions
export const fetchVariants = async (productId: string) => {
  return await prisma.variant.findMany({
    where: { productId },
    include: { batches: true },
  });
};

export const fetchVariantById = async (id: string) => {
  return await prisma.variant.findUnique({
    where: { id },
    include: { product: true, batches: true },
  });
};

export const addVariant = async (data: any) => {
  return await prisma.variant.create({
    data,
  });
};

export const updateVariant = async (id: string, data: any) => {
  return await prisma.variant.update({
    where: { id },
    data,
  });
};

export const deleteVariant = async (id: string) => {
  return await prisma.variant.delete({
    where: { id },
  });
};

export const updateVariantStock = async (id: string, stock: number) => {
  return await prisma.variant.update({
    where: { id },
    data: { stock },
  });
};

// Batch functions
export const fetchBatches = async (variantId: string) => {
  return await prisma.batch.findMany({
    where: { variantId },
  });
};

export const fetchBatchById = async (id: string) => {
  return await prisma.batch.findUnique({
    where: { id },
    include: { variant: true },
  });
};

export const addBatch = async (data: any) => {
  return await prisma.batch.create({
    data,
  });
};

export const updateBatch = async (id: string, data: any) => {
  return await prisma.batch.update({
    where: { id },
    data,
  });
};

export const deleteBatch = async (id: string) => {
  return await prisma.batch.delete({
    where: { id },
  });
};

export const updateBatchStock = async (id: string, stock: number) => {
  return await prisma.batch.update({
    where: { id },
    data: { stock },
  });
};

// Inventory functions
export const getLowStockVariants = async (threshold: number = 3) => {
  return await prisma.variant.findMany({
    where: {
      stock: {
        lt: threshold,
      },
    },
    include: { product: true, batches: true },
  });
};

export const getLowStockBatches = async (threshold: number = 3) => {
  return await prisma.batch.findMany({
    where: {
      stock: {
        lt: threshold,
      },
    },
    include: { variant: { include: { product: true } } },
  });
};
