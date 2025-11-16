import { Hono } from 'hono';
import { login } from '../controllers/authController.js';
const authRoutes = new Hono();
authRoutes.post('/login', login);
export default authRoutes;
