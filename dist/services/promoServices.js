import { prisma } from '../db/prisma.js';
export const fetchPromos = async () => {
    return await prisma.promo.findMany();
};
export const validatePromo = async (code) => {
    const promo = await prisma.promo.findFirst({
        where: {
            code,
            expiresAt: { gt: new Date() },
        },
    });
    return promo;
};
