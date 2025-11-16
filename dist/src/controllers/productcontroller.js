import { fetchProducts, fetchProductById, addProduct, updateProduct, deleteProduct, updateProductStock, calculateProductMargin, getLowStockProducts, getProductsByCategory, fetchVariants, fetchVariantById, addVariant, updateVariant, deleteVariant, updateVariantStock, fetchBatches, fetchBatchById, addBatch, updateBatch, deleteBatch, updateBatchStock, getLowStockVariants, getLowStockBatches } from '../services/productServices.js';
export const getAllProducts = async (c) => {
    try {
        const products = await fetchProducts();
        return c.json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return c.json({ error: 'Failed to fetch products' }, 500);
    }
};
export const getProductById = async (c) => {
    try {
        const id = c.req.param('id');
        const product = await fetchProductById(id);
        if (!product) {
            return c.json({ error: 'Product not found' }, 404);
        }
        return c.json(product);
    }
    catch (error) {
        console.error('Error fetching product:', error);
        return c.json({ error: 'Failed to fetch product' }, 500);
    }
};
export const createProduct = async (c) => {
    try {
        const body = await c.req.json();
        const newProduct = await addProduct(body);
        return c.json(newProduct, 201);
    }
    catch (error) {
        console.error('Error creating product:', error);
        return c.json({ error: 'Failed to create product' }, 500);
    }
};
export const updateProductController = async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const updatedProduct = await updateProduct(id, body);
        return c.json(updatedProduct);
    }
    catch (error) {
        console.error('Error updating product:', error);
        return c.json({ error: 'Failed to update product' }, 500);
    }
};
export const updateStock = async (c) => {
    try {
        const id = c.req.param('id');
        const { stock } = await c.req.json();
        const updatedProduct = await updateProductStock(id, parseInt(stock));
        return c.json(updatedProduct);
    }
    catch (error) {
        console.error('Error updating stock:', error);
        return c.json({ error: 'Failed to update stock' }, 500);
    }
};
export const deleteProductController = async (c) => {
    try {
        const id = c.req.param('id');
        await deleteProduct(id);
        return c.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        return c.json({ error: 'Failed to delete product' }, 500);
    }
};
export const getLowStock = async (c) => {
    try {
        const threshold = parseInt(c.req.query('threshold') || '3');
        const products = await getLowStockProducts(threshold);
        return c.json(products);
    }
    catch (error) {
        console.error('Error fetching low stock products:', error);
        return c.json({ error: 'Failed to fetch low stock products' }, 500);
    }
};
export const getProductsByCategoryController = async (c) => {
    try {
        const categoryId = c.req.param('categoryId');
        const products = await getProductsByCategory(categoryId);
        return c.json(products);
    }
    catch (error) {
        console.error('Error fetching products by category:', error);
        return c.json({ error: 'Failed to fetch products by category' }, 500);
    }
};
export const calculateMargin = async (c) => {
    try {
        const { sellingPrice, buyingCost } = await c.req.json();
        const margin = calculateProductMargin(parseFloat(sellingPrice), parseFloat(buyingCost));
        return c.json({ margin: margin.toFixed(2) });
    }
    catch (error) {
        console.error('Error calculating margin:', error);
        return c.json({ error: 'Failed to calculate margin' }, 500);
    }
};
// Variant controllers
export const getVariants = async (c) => {
    try {
        const productId = c.req.param('productId');
        const variants = await fetchVariants(productId);
        return c.json(variants);
    }
    catch (error) {
        console.error('Error fetching variants:', error);
        return c.json({ error: 'Failed to fetch variants' }, 500);
    }
};
export const getVariantById = async (c) => {
    try {
        const id = c.req.param('id');
        const variant = await fetchVariantById(id);
        if (!variant) {
            return c.json({ error: 'Variant not found' }, 404);
        }
        return c.json(variant);
    }
    catch (error) {
        console.error('Error fetching variant:', error);
        return c.json({ error: 'Failed to fetch variant' }, 500);
    }
};
export const createVariant = async (c) => {
    try {
        const body = await c.req.json();
        const newVariant = await addVariant(body);
        return c.json(newVariant, 201);
    }
    catch (error) {
        console.error('Error creating variant:', error);
        return c.json({ error: 'Failed to create variant' }, 500);
    }
};
export const updateVariantController = async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const updatedVariant = await updateVariant(id, body);
        return c.json(updatedVariant);
    }
    catch (error) {
        console.error('Error updating variant:', error);
        return c.json({ error: 'Failed to update variant' }, 500);
    }
};
export const updateVariantStockController = async (c) => {
    try {
        const id = c.req.param('id');
        const { stock } = await c.req.json();
        const updatedVariant = await updateVariantStock(id, parseInt(stock));
        return c.json(updatedVariant);
    }
    catch (error) {
        console.error('Error updating variant stock:', error);
        return c.json({ error: 'Failed to update variant stock' }, 500);
    }
};
export const deleteVariantController = async (c) => {
    try {
        const id = c.req.param('id');
        await deleteVariant(id);
        return c.json({ message: 'Variant deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting variant:', error);
        return c.json({ error: 'Failed to delete variant' }, 500);
    }
};
// Batch controllers
export const getBatches = async (c) => {
    try {
        const variantId = c.req.param('variantId');
        const batches = await fetchBatches(variantId);
        return c.json(batches);
    }
    catch (error) {
        console.error('Error fetching batches:', error);
        return c.json({ error: 'Failed to fetch batches' }, 500);
    }
};
export const getBatchById = async (c) => {
    try {
        const id = c.req.param('id');
        const batch = await fetchBatchById(id);
        if (!batch) {
            return c.json({ error: 'Batch not found' }, 404);
        }
        return c.json(batch);
    }
    catch (error) {
        console.error('Error fetching batch:', error);
        return c.json({ error: 'Failed to fetch batch' }, 500);
    }
};
export const createBatch = async (c) => {
    try {
        const body = await c.req.json();
        const newBatch = await addBatch(body);
        return c.json(newBatch, 201);
    }
    catch (error) {
        console.error('Error creating batch:', error);
        return c.json({ error: 'Failed to create batch' }, 500);
    }
};
export const updateBatchController = async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const updatedBatch = await updateBatch(id, body);
        return c.json(updatedBatch);
    }
    catch (error) {
        console.error('Error updating batch:', error);
        return c.json({ error: 'Failed to update batch' }, 500);
    }
};
export const updateBatchStockController = async (c) => {
    try {
        const id = c.req.param('id');
        const { stock } = await c.req.json();
        const updatedBatch = await updateBatchStock(id, parseInt(stock));
        return c.json(updatedBatch);
    }
    catch (error) {
        console.error('Error updating batch stock:', error);
        return c.json({ error: 'Failed to update batch stock' }, 500);
    }
};
export const deleteBatchController = async (c) => {
    try {
        const id = c.req.param('id');
        await deleteBatch(id);
        return c.json({ message: 'Batch deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting batch:', error);
        return c.json({ error: 'Failed to delete batch' }, 500);
    }
};
// Inventory controllers
export const getLowStockVariantsController = async (c) => {
    try {
        const threshold = parseInt(c.req.query('threshold') || '3');
        const variants = await getLowStockVariants(threshold);
        return c.json(variants);
    }
    catch (error) {
        console.error('Error fetching low stock variants:', error);
        return c.json({ error: 'Failed to fetch low stock variants' }, 500);
    }
};
export const getLowStockBatchesController = async (c) => {
    try {
        const threshold = parseInt(c.req.query('threshold') || '3');
        const batches = await getLowStockBatches(threshold);
        return c.json(batches);
    }
    catch (error) {
        console.error('Error fetching low stock batches:', error);
        return c.json({ error: 'Failed to fetch low stock batches' }, 500);
    }
};
