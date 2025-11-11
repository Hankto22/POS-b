import type { Context } from 'hono';
import { fetchDashboardStats } from '../services/dashboardService.js';

export const getDashboardStats = async (c: Context) => {
  const stats = await fetchDashboardStats();
  return c.json(stats);
};
