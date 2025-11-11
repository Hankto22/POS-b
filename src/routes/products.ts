import { Hono } from 'hono';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductController,
  updateStock,
  deleteProductController,
  getLowStock,
  getProductsByCategoryController,
  calculateMargin
} from '../controllers/productcontroller.js';

const productRoutes = new Hono();

productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getProductById);
productRoutes.post('/', createProduct);
productRoutes.put('/:id', updateProductController);
productRoutes.put('/:id/stock', updateStock);
productRoutes.delete('/:id', deleteProductController);
productRoutes.get('/low-stock', getLowStock);
productRoutes.get('/category/:categoryId', getProductsByCategoryController);
productRoutes.post('/calculate-margin', calculateMargin);

export default productRoutes;
