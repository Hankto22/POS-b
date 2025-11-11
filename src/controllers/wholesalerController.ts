import type { Context } from 'hono';
import { fetchWholesalers, addWholesaler, updateWholesaler, deleteWholesaler } from '../services/wholesalerService.js';

export const getAllWholesalers = async (c: Context) => {
  const wholesalers = await fetchWholesalers();
  return c.json(wholesalers);
};

export const createWholesaler = async (c: Context) => {
  const body = await c.req.json();
  const newWholesaler = await addWholesaler(body);
  return c.json(newWholesaler, 201);
};

export const updateWholesalerById = async (c: Context) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const updatedWholesaler = await updateWholesaler(id, body);
  return c.json(updatedWholesaler);
};

export const deleteWholesalerById = async (c: Context) => {
  const id = c.req.param('id');
  await deleteWholesaler(id);
  return c.json({ message: 'Wholesaler deleted successfully' });
};