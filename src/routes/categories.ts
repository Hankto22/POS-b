import { Hono } from 'hono';
import { getAllCategories, createCategory, removeCategory } from '../controllers/categorycontroller.js';

const categoryRoutes = new Hono();

categoryRoutes.get('/', getAllCategories);
categoryRoutes.post('/', createCategory);
categoryRoutes.delete('/:id', removeCategory);

export default categoryRoutes;
