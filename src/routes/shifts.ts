import { Hono } from 'hono';
import { auth } from '../middleware/auth.js';
import { roleGuard } from '../middleware/roleGuard.js';
import {
  startUserShift,
  endUserShift,
  getUserShifts,
  getAllShifts,
  getShift,
} from '../controllers/shiftController.js';

const shiftRoutes = new Hono();

// All shift routes require authentication
shiftRoutes.use('*', auth);

// Start shift (staff can start their own)
shiftRoutes.post('/start', startUserShift);

// End shift (staff can end their own, managers/admins can end any)
shiftRoutes.put('/:shiftId/end', roleGuard(['admin', 'manager']), endUserShift);

// Get user's own shifts
shiftRoutes.get('/my', getUserShifts);

// Get all shifts (managers/admins)
shiftRoutes.get('/', roleGuard(['admin', 'manager']), getAllShifts);

// Get specific shift (managers/admins or own)
shiftRoutes.get('/:shiftId', getShift);

export default shiftRoutes;