import { Hono } from 'hono';
import { getAllInvoices, createInvoice, updateInvoiceById, deleteInvoiceById } from '../controllers/invoiceController.js';

const invoiceRoutes = new Hono();

invoiceRoutes.get('/', getAllInvoices);
invoiceRoutes.post('/', createInvoice);
invoiceRoutes.put('/:id', updateInvoiceById);
invoiceRoutes.delete('/:id', deleteInvoiceById);

export default invoiceRoutes;