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

export const addInvoice = async (data: any) => {
  const { items, ...invoiceData } = data;
  return await prisma.invoice.create({
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
};

export const updateInvoice = async (id: string, data: any) => {
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

export const deleteInvoice = async (id: string) => {
  return await prisma.invoice.delete({
    where: { id },
  });
};