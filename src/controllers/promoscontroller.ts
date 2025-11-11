import type { Context } from 'hono';
import { fetchPromos, validatePromo } from '../services/promoServices.js';

export const getPromos = async (c: Context) => {
  const promos = await fetchPromos();
  return c.json(promos);
};

export const applyPromo = async (c: Context) => {
  const { code } = await c.req.json();
  const promo = await validatePromo(code);
  return promo ? c.json(promo) : c.text('Invalid or expired promo code', 400);
};
