import { prisma } from '../db/prisma.js';
export const fetchCustomers = async () => {
    return await prisma.customer.findMany();
};
export const addCustomer = async (data) => {
    return await prisma.customer.create({ data });
};
// Campaigns
export const createCampaign = async (data) => {
    return await prisma.campaign.create({ data });
};
export const getCampaigns = async () => {
    return await prisma.campaign.findMany({ include: { user: true } });
};
export const sendCampaign = async (campaignId) => {
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (campaign?.type === 'SMS') {
        const { sendSMSCampaign } = await import('./marketingService.js');
        await sendSMSCampaign(campaignId);
    }
    else if (campaign?.type === 'Email') {
        const { sendEmailCampaign } = await import('./marketingService.js');
        await sendEmailCampaign(campaignId);
    }
};
// Feedback
export const createFeedback = async (data) => {
    return await prisma.feedback.create({ data });
};
export const getFeedbacks = async () => {
    return await prisma.feedback.findMany({ include: { customer: true } });
};
// Offers
export const getOffers = async () => {
    return await prisma.offer.findMany({ include: { customer: true } });
};
export const updateOffer = async (id, data) => {
    return await prisma.offer.update({ where: { id }, data });
};
// Automation
export const triggerBirthdayOffers = async () => {
    const { checkAndSendBirthdayOffers } = await import('./marketingService.js');
    await checkAndSendBirthdayOffers();
};
export const triggerVIPOffers = async () => {
    const { checkAndSendVIPOffers } = await import('./marketingService.js');
    await checkAndSendVIPOffers();
};
