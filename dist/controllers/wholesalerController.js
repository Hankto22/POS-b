import { fetchWholesalers, addWholesaler, updateWholesaler, deleteWholesaler } from '../services/wholesalerService.js';
export const getAllWholesalers = async (c) => {
    const wholesalers = await fetchWholesalers();
    return c.json(wholesalers);
};
export const createWholesaler = async (c) => {
    const body = await c.req.json();
    const newWholesaler = await addWholesaler(body);
    return c.json(newWholesaler, 201);
};
export const updateWholesalerById = async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updatedWholesaler = await updateWholesaler(id, body);
    return c.json(updatedWholesaler);
};
export const deleteWholesalerById = async (c) => {
    const id = c.req.param('id');
    await deleteWholesaler(id);
    return c.json({ message: 'Wholesaler deleted successfully' });
};
