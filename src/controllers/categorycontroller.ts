import type { Context } from 'hono';
import { fetchCategories, addCategory } from '../services/categoryService.js';

export const getAllCategories = async (c: Context) => {
  const categories = await fetchCategories();
  return c.json(categories);
};

export const createCategory = async (c: Context) => {
  const body = await c.req.json();
  const newCategory = await addCategory(body.name);
  return c.json(newCategory, 201);
};
