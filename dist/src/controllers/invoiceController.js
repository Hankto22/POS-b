import { fetchInvoices, addInvoice, updateInvoice, deleteInvoice } from '../services/invoiceService.js';
export const getAllInvoices = async (c) => {
    const invoices = await fetchInvoices();
    return c.json(invoices);
};
export const createInvoice = async (c) => {
    const body = await c.req.json();
    const newInvoice = await addInvoice(body);
    return c.json(newInvoice, 201);
};
export const updateInvoiceById = async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updatedInvoice = await updateInvoice(id, body);
    return c.json(updatedInvoice);
};
export const deleteInvoiceById = async (c) => {
    const id = c.req.param('id');
    await deleteInvoice(id);
    return c.json({ message: 'Invoice deleted successfully' });
};
