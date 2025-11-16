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
  calculateMargin,
  getVariants,
  getVariantById,
  createVariant,
  updateVariantController,
  updateVariantStockController,
  deleteVariantController,
  getBatches,
  getBatchById,
  createBatch,
  updateBatchController,
  updateBatchStockController,
  deleteBatchController,
  getLowStockVariantsController,
  getLowStockBatchesController
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

// Variant routes
productRoutes.get('/:productId/variants', getVariants);
productRoutes.get('/variants/:id', getVariantById);
productRoutes.post('/variants', createVariant);
productRoutes.put('/variants/:id', updateVariantController);
productRoutes.put('/variants/:id/stock', updateVariantStockController);
productRoutes.delete('/variants/:id', deleteVariantController);

// Batch routes
productRoutes.get('/:variantId/batches', getBatches);
productRoutes.get('/batches/:id', getBatchById);
productRoutes.post('/batches', createBatch);
productRoutes.put('/batches/:id', updateBatchController);
productRoutes.put('/batches/:id/stock', updateBatchStockController);
productRoutes.delete('/batches/:id', deleteBatchController);

// Inventory routes
productRoutes.get('/low-stock-variants', getLowStockVariantsController);
productRoutes.get('/low-stock-batches', getLowStockBatchesController);

export default productRoutes;
