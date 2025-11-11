import { prisma } from '../db/prisma.js';
export const fetchSales = async () => {
    return await prisma.sale.findMany({
        include: { product: true, customer: true },
    });
};
export const addSale = async (data) => {
    const newSale = await prisma.sale.create({ data });
    if (data.customerId) {
        await prisma.customer.update({
            where: { id: data.customerId },
            data: {
                loyaltyPoints: { increment: Math.floor((data.total || 0) / 100) }, // 1 point per KES 100
            },
        });
    }
    return newSale;
};
