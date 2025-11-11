import { prisma } from '../db/prisma.js';

export const fetchSales = async () => {
  return await prisma.sale.findMany({
    include: { product: true, customer: true },
  });
};

export const fetchSalesByDateRange = async (startDate: Date, endDate: Date) => {
  return await prisma.sale.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: { product: true, customer: true },
  });
};

export const addSale = async (data: any) => {
  // Start a transaction to ensure data consistency
  return await prisma.$transaction(async (tx: any) => {
    // Create the sale record
    const newSale = await tx.sale.create({ data });

    // Update product stock
    await tx.product.update({
      where: { id: data.productId },
      data: {
        stock: {
          decrement: data.quantity,
        },
      },
    });

    // Update customer loyalty points if customer exists
    if (data.customerId) {
      await tx.customer.update({
        where: { id: data.customerId },
        data: {
          loyaltyPoints: { increment: Math.floor((data.total || 0) / 100) }, // 1 point per KES 100
        },
      });
    }

    return newSale;
  });
};

export const calculateTotalRevenue = async (startDate?: Date, endDate?: Date) => {
  const whereClause = startDate && endDate ? {
    createdAt: {
      gte: startDate,
      lte: endDate,
    },
  } : {};

  const result = await prisma.sale.aggregate({
    _sum: {
      total: true,
    },
    where: whereClause,
  });

  return result._sum.total || 0;
};

export const getTopSellingProducts = async (limit: number = 10) => {
  return await prisma.sale.groupBy({
    by: ['productId'],
    _sum: {
      quantity: true,
      total: true,
    },
    orderBy: {
      _sum: {
        quantity: 'desc',
      },
    },
    take: limit,
  });
};

export const getSalesByCustomer = async (customerId: string) => {
  return await prisma.sale.findMany({
    where: { customerId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
};
