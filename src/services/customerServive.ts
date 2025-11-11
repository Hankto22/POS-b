import { prisma } from '../db/prisma.js';

export const fetchCustomers = async () => {
  return await prisma.customer.findMany();
};

export const addCustomer = async (data: any) => {
  return await prisma.customer.create({ data });
};
