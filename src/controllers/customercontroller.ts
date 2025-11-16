import type { Context } from 'hono';
import {
  fetchCustomers,
  addCustomer,
  createCampaign,
  getCampaigns,
  sendCampaign,
  createFeedback,
  getFeedbacks,
  getOffers,
  updateOffer,
  triggerBirthdayOffers,
  triggerVIPOffers,
} from '../services/customerServive.js';

export const getAllCustomers = async (c: Context) => {
  const customers = await fetchCustomers();
  return c.json(customers);
};

export const createCustomer = async (c: Context) => {
  const body = await c.req.json();
  const newCustomer = await addCustomer(body);
  return c.json(newCustomer, 201);
};

// Campaigns
export const getCampaignsController = async (c: Context) => {
  const campaigns = await getCampaigns();
  return c.json(campaigns);
};

export const createCampaignController = async (c: Context) => {
  const body = await c.req.json();
  const campaign = await createCampaign(body);
  return c.json(campaign, 201);
};

export const sendCampaignController = async (c: Context) => {
  const { id } = c.req.param();
  await sendCampaign(id);
  return c.json({ message: 'Campaign sent' });
};

// Feedback
export const getFeedbacksController = async (c: Context) => {
  const feedbacks = await getFeedbacks();
  return c.json(feedbacks);
};

export const createFeedbackController = async (c: Context) => {
  const body = await c.req.json();
  const feedback = await createFeedback(body);
  return c.json(feedback, 201);
};

// Offers
export const getOffersController = async (c: Context) => {
  const offers = await getOffers();
  return c.json(offers);
};

export const updateOfferController = async (c: Context) => {
  const { id } = c.req.param();
  const body = await c.req.json();
  const offer = await updateOffer(id, body);
  return c.json(offer);
};

// Automation
export const triggerBirthdayOffersController = async (c: Context) => {
  await triggerBirthdayOffers();
  return c.json({ message: 'Birthday offers triggered' });
};

export const triggerVIPOffersController = async (c: Context) => {
  await triggerVIPOffers();
  return c.json({ message: 'VIP offers triggered' });
};
