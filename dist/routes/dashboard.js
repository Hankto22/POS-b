import { Hono } from 'hono';
import { getDashboardStats } from '../controllers/dashboardcontroller.js';
const dashboardRoutes = new Hono();
dashboardRoutes.get('/', getDashboardStats);
export default dashboardRoutes;
