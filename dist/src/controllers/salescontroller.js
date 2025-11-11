import { fetchSales, addSale } from '../services/salesService.js';
import { sendReceiptEmail } from '../services/emailService.js';
export const createSale = async (c) => {
    const body = await c.req.json();
    const newSale = await addSale(body);
    if (body.customerEmail) {
        const receiptHtml = `<h3>Receipt</h3><p>${body.quantity} × ${body.productName} = KES ${body.total}</p>`;
        await sendReceiptEmail(body.customerEmail, receiptHtml);
    }
    return c.json(newSale, 201);
};
export const getAllSales = async (c) => {
    const sales = await fetchSales();
    return c.json(sales);
};
