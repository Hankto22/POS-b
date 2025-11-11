import type { Context } from 'hono';
import { fetchInvoices, addInvoice, updateInvoice, deleteInvoice } from '../services/invoiceService.js';

export const getAllInvoices = async (c: Context) => {
  const invoices = await fetchInvoices();
  return c.json(invoices);
};

export const createInvoice = async (c: Context) => {
  const body = await c.req.json();
  const newInvoice = await addInvoice(body);
  return c.json(newInvoice, 201);
};

export const updateInvoiceById = async (c: Context) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const updatedInvoice = await updateInvoice(id, body);
  return c.json(updatedInvoice);
};

export const deleteInvoiceById = async (c: Context) => {
  const id = c.req.param('id');
  await deleteInvoice(id);
  return c.json({ message: 'Invoice deleted successfully' });
};