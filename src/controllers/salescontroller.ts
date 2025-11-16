import type { Context } from 'hono';
import {
  fetchSales,
  fetchSalesByDateRange,
  addSale,
  calculateTotalRevenue,
  getTopSellingProducts,
  getSalesByCustomer,
  createTransaction,
  fetchTransactions
} from '../services/salesService.js';
import { sendReceiptEmail } from '../services/emailService.js';

export const createSale = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newSale = await addSale(body);

    // Temporarily disable email sending for development
    // if (body.customerEmail) {
    //   const receiptHtml = `<h3>Receipt</h3><p>${body.quantity} × ${body.productName} = KES ${body.total}</p>`;
    //   await sendReceiptEmail(body.customerEmail, receiptHtml);
    // }

    return c.json(newSale, 201);
  } catch (error) {
    console.error('Error creating sale:', error);
    return c.json({ error: 'Failed to create sale' }, 500);
  }
};

export const getAllSales = async (c: Context) => {
  try {
    const sales = await fetchSales();
    return c.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    return c.json({ error: 'Failed to fetch sales' }, 500);
  }
};

export const getSalesByDateRange = async (c: Context) => {
  try {
    const startDate = new Date(c.req.query('startDate') || '');
    const endDate = new Date(c.req.query('endDate') || '');

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return c.json({ error: 'Invalid date range' }, 400);
    }

    const sales = await fetchSalesByDateRange(startDate, endDate);
    return c.json(sales);
  } catch (error) {
    console.error('Error fetching sales by date range:', error);
    return c.json({ error: 'Failed to fetch sales by date range' }, 500);
  }
};

export const getTotalRevenue = async (c: Context) => {
  try {
    const startDate = c.req.query('startDate') ? new Date(c.req.query('startDate')!) : undefined;
    const endDate = c.req.query('endDate') ? new Date(c.req.query('endDate')!) : undefined;

    const revenue = await calculateTotalRevenue(startDate, endDate);
    return c.json({ totalRevenue: revenue });
  } catch (error) {
    console.error('Error calculating revenue:', error);
    return c.json({ error: 'Failed to calculate revenue' }, 500);
  }
};

export const getTopProducts = async (c: Context) => {
  try {
    const limit = parseInt(c.req.query('limit') || '10');
    const topProducts = await getTopSellingProducts(limit);
    return c.json(topProducts);
  } catch (error) {
    console.error('Error fetching top products:', error);
    return c.json({ error: 'Failed to fetch top products' }, 500);
  }
};

export const getCustomerSales = async (c: Context) => {
  try {
    const customerId = c.req.param('customerId');
    const sales = await getSalesByCustomer(customerId);
    return c.json(sales);
  } catch (error) {
    console.error('Error fetching customer sales:', error);
    return c.json({ error: 'Failed to fetch customer sales' }, 500);
  }
};

export const createTransactionController = async (c: Context) => {
  try {
    const body = await c.req.json();
    const transaction = await createTransaction(body);
    return c.json(transaction, 201);
  } catch (error) {
    console.error('Error creating transaction:', error);
    return c.json({ error: (error as Error).message || 'Failed to create transaction' }, 500);
  }
};

export const getAllTransactions = async (c: Context) => {
  try {
    const transactions = await fetchTransactions();
    return c.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return c.json({ error: 'Failed to fetch transactions' }, 500);
  }
};
