import type { Context } from 'hono';
import { fetchCustomers, addCustomer } from '../services/customerServive.js';

export const getAllCustomers = async (c: Context) => {
  const customers = await fetchCustomers();
  return c.json(customers);
};

export const createCustomer = async (c: Context) => {
  const body = await c.req.json();
  const newCustomer = await addCustomer(body);
  return c.json(newCustomer, 201);
};
