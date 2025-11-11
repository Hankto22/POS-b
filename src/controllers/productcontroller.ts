import type { Context } from 'hono';
import {
  fetchProducts,
  fetchProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  calculateProductMargin,
  getLowStockProducts,
  getProductsByCategory
} from '../services/productServices.js';

export const getAllProducts = async (c: Context) => {
  try {
    const products = await fetchProducts();
    return c.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
};

export const getProductById = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const product = await fetchProductById(id);
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }
    return c.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return c.json({ error: 'Failed to fetch product' }, 500);
  }
};

export const createProduct = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newProduct = await addProduct(body);
    return c.json(newProduct, 201);
  } catch (error) {
    console.error('Error creating product:', error);
    return c.json({ error: 'Failed to create product' }, 500);
  }
};

export const updateProductController = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updatedProduct = await updateProduct(id, body);
    return c.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return c.json({ error: 'Failed to update product' }, 500);
  }
};

export const updateStock = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const { stock } = await c.req.json();
    const updatedProduct = await updateProductStock(id, parseInt(stock));
    return c.json(updatedProduct);
  } catch (error) {
    console.error('Error updating stock:', error);
    return c.json({ error: 'Failed to update stock' }, 500);
  }
};

export const deleteProductController = async (c: Context) => {
  try {
    const id = c.req.param('id');
    await deleteProduct(id);
    return c.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return c.json({ error: 'Failed to delete product' }, 500);
  }
};

export const getLowStock = async (c: Context) => {
  try {
    const threshold = parseInt(c.req.query('threshold') || '5');
    const products = await getLowStockProducts(threshold);
    return c.json(products);
  } catch (error) {
    console.error('Error fetching low stock products:', error);
    return c.json({ error: 'Failed to fetch low stock products' }, 500);
  }
};

export const getProductsByCategoryController = async (c: Context) => {
  try {
    const categoryId = c.req.param('categoryId');
    const products = await getProductsByCategory(categoryId);
    return c.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return c.json({ error: 'Failed to fetch products by category' }, 500);
  }
};

export const calculateMargin = async (c: Context) => {
  try {
    const { sellingPrice, buyingCost } = await c.req.json();
    const margin = calculateProductMargin(parseFloat(sellingPrice), parseFloat(buyingCost));
    return c.json({ margin: margin.toFixed(2) });
  } catch (error) {
    console.error('Error calculating margin:', error);
    return c.json({ error: 'Failed to calculate margin' }, 500);
  }
};
