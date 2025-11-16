import { Hono } from 'hono';
import { auth } from '../middleware/auth.js';
import { roleGuard } from '../middleware/roleGuard.js';
import { getMyCommissions, getAllCommissions, getCommission } from '../controllers/commissionController.js';
const commissionRoutes = new Hono();
// All commission routes require authentication
commissionRoutes.use('*', auth);
// Get own commissions
commissionRoutes.get('/my', getMyCommissions);
// Get all commissions (managers/admins)
commissionRoutes.get('/', roleGuard(['admin', 'manager']), getAllCommissions);
// Get specific commission
commissionRoutes.get('/:commissionId', getCommission);
export default commissionRoutes;
