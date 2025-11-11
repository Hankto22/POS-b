import { prisma } from '../db/prisma.js';
export const fetchCategories = async () => {
    return await prisma.category.findMany();
};
export const addCategory = async (name) => {
    return await prisma.category.create({
        data: { name },
    });
};
