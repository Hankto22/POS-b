import { prisma } from '../db/prisma.js';

export const fetchWholesalers = async () => {
  return await prisma.wholesaler.findMany();
};

export const addWholesaler = async (data: any) => {
  return await prisma.wholesaler.create({
    data,
  });
};

export const updateWholesaler = async (id: string, data: any) => {
  return await prisma.wholesaler.update({
    where: { id },
    data,
  });
};

export const deleteWholesaler = async (id: string) => {
  return await prisma.wholesaler.delete({
    where: { id },
  });
};