import { fetchProducts, addProduct } from '../services/productServices.js';
export const getAllProducts = async (c) => {
    const products = await fetchProducts();
    return c.json(products);
};
export const createProduct = async (c) => {
    const body = await c.req.json();
    const newProduct = await addProduct(body);
    return c.json(newProduct, 201);
};
