import { Hono } from 'hono';
import { getPromos, applyPromo } from '../controllers/promoscontroller.js';
const promoRoutes = new Hono();
promoRoutes.get('/', getPromos);
promoRoutes.post('/apply', applyPromo);
export default promoRoutes;
