import { Hono } from 'hono';
import { getAllWholesalers, createWholesaler, updateWholesalerById, deleteWholesalerById } from '../controllers/wholesalerController.js';
const wholesalerRoutes = new Hono();
wholesalerRoutes.get('/', getAllWholesalers);
wholesalerRoutes.post('/', createWholesaler);
wholesalerRoutes.put('/:id', updateWholesalerById);
wholesalerRoutes.delete('/:id', deleteWholesalerById);
export default wholesalerRoutes;
