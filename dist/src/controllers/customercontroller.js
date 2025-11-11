import { fetchCustomers, addCustomer } from '../services/customerServive.js';
export const getAllCustomers = async (c) => {
    const customers = await fetchCustomers();
    return c.json(customers);
};
export const createCustomer = async (c) => {
    const body = await c.req.json();
    const newCustomer = await addCustomer(body);
    return c.json(newCustomer, 201);
};
