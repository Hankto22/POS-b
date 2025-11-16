import { prisma } from '../db/prisma.js';
import { PrismaClient } from '@prisma/client';
export const fetchSales = async () => {
    return await prisma.sale.findMany({
        include: { product: true, customer: true },
    });
};
export const fetchSalesByDateRange = async (startDate, endDate) => {
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
export const addSale = async (data) => {
    // Start a transaction to ensure data consistency
    return await prisma.$transaction(async (tx) => {
        // Create the sale record
        const newSale = await tx.sale.create({ data });
        // Update stock based on variant or batch
        if (data.batchId) {
            await tx.batch.update({
                where: { id: data.batchId },
                data: {
                    stock: {
                        decrement: data.quantity,
                    },
                },
            });
        }
        else if (data.variantId) {
            await tx.variant.update({
                where: { id: data.variantId },
                data: {
                    stock: {
                        decrement: data.quantity,
                    },
                },
            });
        }
        else {
            // Fallback to product stock
            await tx.product.update({
                where: { id: data.productId },
                data: {
                    stock: {
                        decrement: data.quantity,
                    },
                },
            });
        }
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
export const calculateTotalRevenue = async (startDate, endDate) => {
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
export const getTopSellingProducts = async (limit = 10) => {
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
export const getSalesByCustomer = async (customerId) => {
    return await prisma.sale.findMany({
        where: { customerId },
        include: { product: true },
        orderBy: { createdAt: 'desc' },
    });
};
export const createTransaction = async (data) => {
    const total = data.items.reduce((sum, item) => sum + item.total, 0) + data.tax - data.discount;
    const paymentTotal = data.payments.reduce((sum, payment) => sum + payment.amount, 0);
    if (Math.abs(total - paymentTotal) > 0.01) {
        throw new Error('Payment total does not match sale total');
    }
    return await prisma.$transaction(async (tx) => {
        // Create transaction
        const transaction = await tx.transaction.create({
            data: {
                customerId: data.customerId,
                total,
                tax: data.tax,
                discount: data.discount,
            },
        });
        // Create sales
        for (const item of data.items) {
            await tx.sale.create({
                data: {
                    productId: item.productId,
                    variantId: item.variantId,
                    batchId: item.batchId,
                    customerId: data.customerId,
                    transactionId: transaction.id,
                    quantity: item.quantity,
                    total: item.total,
                },
            });
            // Update stock based on variant or batch
            if (item.batchId) {
                await tx.batch.update({
                    where: { id: item.batchId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }
            else if (item.variantId) {
                await tx.variant.update({
                    where: { id: item.variantId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }
            else {
                // Fallback to product stock
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }
        }
        // Create payments
        for (const payment of data.payments) {
            await tx.payment.create({
                data: {
                    transactionId: transaction.id,
                    method: payment.method,
                    amount: payment.amount,
                },
            });
        }
        // Update customer loyalty points if customer exists
        if (data.customerId) {
            const loyaltyPoints = Math.floor(total / 100);
            await tx.customer.update({
                where: { id: data.customerId },
                data: {
                    loyaltyPoints: { increment: loyaltyPoints },
                    totalSpent: { increment: total },
                },
            });
        }
        return transaction;
    });
};
export const fetchTransactions = async () => {
    return await prisma.transaction.findMany({
        include: {
            customer: true,
            sales: { include: { product: true } },
            payments: true,
        },
    });
};
