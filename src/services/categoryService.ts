import { prisma } from '../db/prisma.js';

export const fetchCategories = async () => {
  return await prisma.category.findMany();
};

export const addCategory = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};

export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};
