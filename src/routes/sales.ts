import { Hono } from 'hono';
import {
  getAllSales,
  createSale,
  getSalesByDateRange,
  getTotalRevenue,
  getTopProducts,
  getCustomerSales
} from '../controllers/salescontroller.js';

const salesRoutes = new Hono();

salesRoutes.get('/', getAllSales);
salesRoutes.post('/', createSale);
salesRoutes.get('/date-range', getSalesByDateRange);
salesRoutes.get('/revenue', getTotalRevenue);
salesRoutes.get('/top-products', getTopProducts);
salesRoutes.get('/customer/:customerId', getCustomerSales);

export default salesRoutes;
