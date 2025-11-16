import { fetchDashboardStats } from '../services/dashboardService.js';
export const getDashboardStats = async (c) => {
    const stats = await fetchDashboardStats();
    return c.json(stats);
};
