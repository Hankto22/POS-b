import { prisma } from '../db/prisma.js';
export const fetchInvoices = async () => {
    return await prisma.invoice.findMany({
        include: {
            wholesaler: true,
            items: {
                include: { product: true },
            },
        },
    });
};
export const addInvoice = async (data) => {
    const { items, ...invoiceData } = data;
    return await prisma.$transaction(async (tx) => {
        const invoice = await tx.invoice.create({
            data: {
                ...invoiceData,
                items: {
                    create: items,
                },
            },
            include: {
                wholesaler: true,
                items: {
                    include: { product: true },
                },
            },
        });
        // Update stock for each item
        for (const item of items) {
            if (item.batchId) {
                await tx.batch.update({
                    where: { id: item.batchId },
                    data: {
                        stock: {
                            increment: item.quantity,
                        },
                    },
                });
            }
            else if (item.variantId) {
                await tx.variant.update({
                    where: { id: item.variantId },
                    data: {
                        stock: {
                            increment: item.quantity,
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
                            increment: item.quantity,
                        },
                    },
                });
            }
        }
        return invoice;
    });
};
export const updateInvoice = async (id, data) => {
    const { items, ...invoiceData } = data;
    return await prisma.invoice.update({
        where: { id },
        data: {
            ...invoiceData,
            items: items ? {
                deleteMany: {},
                create: items,
            } : undefined,
        },
        include: {
            wholesaler: true,
            items: {
                include: { product: true },
            },
        },
    });
};
export const deleteInvoice = async (id) => {
    return await prisma.$transaction(async (tx) => {
        // Fetch invoice with items
        const invoice = await tx.invoice.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        // Decrement stock for each item
        for (const item of invoice.items) {
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
        // Delete the invoice
        return await tx.invoice.delete({
            where: { id },
        });
    });
};
