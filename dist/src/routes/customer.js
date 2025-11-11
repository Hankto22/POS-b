import { Hono } from 'hono';
import { getAllCustomers, createCustomer } from '../controllers/customercontroller.js';
const customerRoutes = new Hono();
customerRoutes.get('/', getAllCustomers);
customerRoutes.post('/', createCustomer);
export default customerRoutes;
