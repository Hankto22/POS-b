import { prisma } from '../db/prisma.js';
export const fetchProducts = async () => {
    return await prisma.product.findMany({
        include: { category: true },
    });
};
export const addProduct = async (data) => {
    return await prisma.product.create({
        data,
    });
};
