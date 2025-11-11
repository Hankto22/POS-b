import { Hono } from 'hono';
import { getAllSales, createSale } from '../controllers/salescontroller.js';
const salesRoutes = new Hono();
salesRoutes.get('/', getAllSales);
salesRoutes.post('/', createSale);
export default salesRoutes;
