import { Hono } from 'hono';
import { getAllProducts, createProduct } from '../controllers/productcontroller.js';
const productRoutes = new Hono();
productRoutes.get('/', getAllProducts);
productRoutes.post('/', createProduct);
export default productRoutes;
