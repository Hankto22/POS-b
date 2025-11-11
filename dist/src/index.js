import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import productRoutes from './routes/products.js';
import customerRoutes from './routes/customer.js';
import salesRoutes from './routes/sales.js';
import categoryRoutes from './routes/categories.js';
import promoRoutes from './routes/promos.js';
import dashboardRoutes from './routes/dashboard.js';
const app = new Hono();
app.get('/', (c) => c.text('Hello Hono!'));
// Mount API sub-routers
app.route('/api/products', productRoutes);
app.route('/api/customers', customerRoutes);
app.route('/api/sales', salesRoutes);
app.route('/api/categories', categoryRoutes);
app.route('/api/promos', promoRoutes);
app.route('/api/dashboard', dashboardRoutes);
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
