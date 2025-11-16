import { prisma } from '../db/prisma.js';
export const fetchProducts = async () => {
    return await prisma.product.findMany({
        include: { category: true, wholesaler: true, variants: { include: { batches: true } } },
    });
};
export const fetchProductById = async (id) => {
    return await prisma.product.findUnique({
        where: { id },
        include: { category: true, wholesaler: true, variants: { include: { batches: true } } },
    });
};
export const addProduct = async (data) => {
    return await prisma.product.create({
        data,
    });
};
export const updateProduct = async (id, data) => {
    return await prisma.product.update({
        where: { id },
        data,
    });
};
export const deleteProduct = async (id) => {
    return await prisma.product.delete({
        where: { id },
    });
};
export const updateProductStock = async (id, stock) => {
    return await prisma.product.update({
        where: { id },
        data: { stock },
    });
};
export const calculateProductMargin = (sellingPrice, buyingCost) => {
    if (buyingCost === 0)
        return 0;
    return ((sellingPrice - buyingCost) / buyingCost * 100);
};
export const getLowStockProducts = async (threshold = 3) => {
    return await prisma.product.findMany({
        where: {
            stock: {
                lt: threshold,
            },
        },
        include: { category: true, wholesaler: true, variants: { include: { batches: true } } },
    });
};
export const getProductsByCategory = async (categoryId) => {
    return await prisma.product.findMany({
        where: { categoryId },
        include: { category: true, wholesaler: true, variants: { include: { batches: true } } },
    });
};
// Variant functions
export const fetchVariants = async (productId) => {
    return await prisma.variant.findMany({
        where: { productId },
        include: { batches: true },
    });
};
export const fetchVariantById = async (id) => {
    return await prisma.variant.findUnique({
        where: { id },
        include: { product: true, batches: true },
    });
};
export const addVariant = async (data) => {
    return await prisma.variant.create({
        data,
    });
};
export const updateVariant = async (id, data) => {
    return await prisma.variant.update({
        where: { id },
        data,
    });
};
export const deleteVariant = async (id) => {
    return await prisma.variant.delete({
        where: { id },
    });
};
export const updateVariantStock = async (id, stock) => {
    return await prisma.variant.update({
        where: { id },
        data: { stock },
    });
};
// Batch functions
export const fetchBatches = async (variantId) => {
    return await prisma.batch.findMany({
        where: { variantId },
    });
};
export const fetchBatchById = async (id) => {
    return await prisma.batch.findUnique({
        where: { id },
        include: { variant: true },
    });
};
export const addBatch = async (data) => {
    return await prisma.batch.create({
        data,
    });
};
export const updateBatch = async (id, data) => {
    return await prisma.batch.update({
        where: { id },
        data,
    });
};
export const deleteBatch = async (id) => {
    return await prisma.batch.delete({
        where: { id },
    });
};
export const updateBatchStock = async (id, stock) => {
    return await prisma.batch.update({
        where: { id },
        data: { stock },
    });
};
// Inventory functions
export const getLowStockVariants = async (threshold = 3) => {
    return await prisma.variant.findMany({
        where: {
            stock: {
                lt: threshold,
            },
        },
        include: { product: true, batches: true },
    });
};
export const getLowStockBatches = async (threshold = 3) => {
    return await prisma.batch.findMany({
        where: {
            stock: {
                lt: threshold,
            },
        },
        include: { variant: { include: { product: true } } },
    });
};
