import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import productRoutes from './routes/products.js'
import customerRoutes from './routes/customer.js'
import salesRoutes from './routes/sales.js'
import categoryRoutes from './routes/categories.js'
import promoRoutes from './routes/promos.js'
import dashboardRoutes from './routes/dashboard.js'
import wholesalerRoutes from './routes/wholesalers.js'
import invoiceRoutes from './routes/invoices.js'

const app = new Hono()

// Enable CORS
app.use('*', cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.get('/', (c) => c.text('Hello Hono!'))

// Mount API sub-routers
app.route('/api/products', productRoutes)
app.route('/api/customers', customerRoutes)
app.route('/api/sales', salesRoutes)
app.route('/api/categories', categoryRoutes)
app.route('/api/promos', promoRoutes)
app.route('/api/dashboard', dashboardRoutes)
app.route('/api/wholesalers', wholesalerRoutes)
app.route('/api/invoices', invoiceRoutes)

serve({
  fetch: app.fetch,
  port: 6000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
