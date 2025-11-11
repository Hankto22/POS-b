import { Hono } from 'hono';
import { getAllCategories, createCategory } from '../controllers/categorycontroller.js';
const categoryRoutes = new Hono();
categoryRoutes.get('/', getAllCategories);
categoryRoutes.post('/', createCategory);
export default categoryRoutes;
