import type { Context } from 'hono';
import { getCommissions, getCommissionById } from '../services/commissionService.js';

export const getMyCommissions = async (c: Context) => {
  try {
    const user = c.get('user');
    const commissions = await getCommissions(user.id);
    return c.json(commissions);
  } catch (error) {
    console.error('Error fetching commissions:', error);
    return c.json({ error: 'Failed to fetch commissions' }, 500);
  }
};

export const getAllCommissions = async (c: Context) => {
  try {
    const commissions = await getCommissions();
    return c.json(commissions);
  } catch (error) {
    console.error('Error fetching all commissions:', error);
    return c.json({ error: 'Failed to fetch commissions' }, 500);
  }
};

export const getCommission = async (c: Context) => {
  try {
    const commissionId = c.req.param('commissionId');
    const commission = await getCommissionById(commissionId);
    if (!commission) {
      return c.json({ error: 'Commission not found' }, 404);
    }
    return c.json(commission);
  } catch (error) {
    console.error('Error fetching commission:', error);
    return c.json({ error: 'Failed to fetch commission' }, 500);
  }
};