import { prisma } from '../db/prisma.js';
export const fetchDashboardStats = async () => {
    const totalSales = await prisma.sale.aggregate({
        _sum: { total: true },
    });
    const topProducts = await prisma.product.findMany({
        orderBy: { stock: 'asc' },
        take: 5,
    });
    const customerCount = await prisma.customer.count();
    return {
        totalRevenue: totalSales._sum.total || 0,
        topProducts,
        customerCount,
    };
};
