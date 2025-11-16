import { Hono } from 'hono';
import {
  getAllCustomers,
  createCustomer,
  getCampaignsController,
  createCampaignController,
  sendCampaignController,
  getFeedbacksController,
  createFeedbackController,
  getOffersController,
  updateOfferController,
  triggerBirthdayOffersController,
  triggerVIPOffersController,
} from '../controllers/customercontroller.js';
import { roleGuard } from '../middleware/roleGuard.js';

const customerRoutes = new Hono();

customerRoutes.get('/', getAllCustomers);
customerRoutes.post('/', createCustomer);

// Campaigns - admin/manager only
customerRoutes.get('/campaigns', roleGuard(['admin', 'manager']), getCampaignsController);
customerRoutes.post('/campaigns', roleGuard(['admin', 'manager']), createCampaignController);
customerRoutes.post('/campaigns/:id/send', roleGuard(['admin', 'manager']), sendCampaignController);

// Feedback
customerRoutes.get('/feedback', getFeedbacksController);
customerRoutes.post('/feedback', createFeedbackController);

// Offers - admin/manager only
customerRoutes.get('/offers', roleGuard(['admin', 'manager']), getOffersController);
customerRoutes.put('/offers/:id', roleGuard(['admin', 'manager']), updateOfferController);

// Automation - admin/manager only
customerRoutes.post('/trigger-birthday-offers', roleGuard(['admin', 'manager']), triggerBirthdayOffersController);
customerRoutes.post('/trigger-vip-offers', roleGuard(['admin', 'manager']), triggerVIPOffersController);

export default customerRoutes;
