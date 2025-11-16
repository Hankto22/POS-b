import { prisma } from '../db/prisma.js';
export const fetchWholesalers = async () => {
    return await prisma.wholesaler.findMany();
};
export const addWholesaler = async (data) => {
    return await prisma.wholesaler.create({
        data,
    });
};
export const updateWholesaler = async (id, data) => {
    return await prisma.wholesaler.update({
        where: { id },
        data,
    });
};
export const deleteWholesaler = async (id) => {
    return await prisma.wholesaler.delete({
        where: { id },
    });
};
