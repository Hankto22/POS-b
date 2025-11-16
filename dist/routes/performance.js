import { Hono } from 'hono';
import { auth } from '../middleware/auth.js';
import { roleGuard } from '../middleware/roleGuard.js';
import { getMyPerformance, getAllPerformances } from '../controllers/performanceController.js';
const performanceRoutes = new Hono();
// All performance routes require authentication
performanceRoutes.use('*', auth);
// Get own performance
performanceRoutes.get('/my', getMyPerformance);
// Get all employees' performances (managers/admins)
performanceRoutes.get('/', roleGuard(['admin', 'manager']), getAllPerformances);
export default performanceRoutes;
