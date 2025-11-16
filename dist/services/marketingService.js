import twilio from 'twilio';
import nodemailer from 'nodemailer';
import { prisma } from '../db/prisma.js';
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
export const sendSMSCampaign = async (campaignId) => {
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign || campaign.type !== 'SMS')
        return;
    const targetTiers = campaign.targetTiers ? campaign.targetTiers.split(',') : [];
    const customers = await prisma.customer.findMany({
        where: targetTiers.length > 0 ? { membershipTier: { in: targetTiers } } : {},
    });
    for (const customer of customers) {
        if (customer.phone) {
            await twilioClient.messages.create({
                body: campaign.message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: customer.phone,
            });
        }
    }
    await prisma.campaign.update({
        where: { id: campaignId },
        data: { sentAt: new Date() },
    });
};
export const sendEmailCampaign = async (campaignId) => {
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign || campaign.type !== 'Email')
        return;
    const targetTiers = campaign.targetTiers ? campaign.targetTiers.split(',') : [];
    const customers = await prisma.customer.findMany({
        where: targetTiers.length > 0 ? { membershipTier: { in: targetTiers } } : {},
    });
    for (const customer of customers) {
        if (customer.email) {
            await transporter.sendMail({
                from: '"Royal Gibs Boutique" <marketing@royalgibs.com>',
                to: customer.email,
                subject: campaign.name,
                text: campaign.message,
            });
        }
    }
    await prisma.campaign.update({
        where: { id: campaignId },
        data: { sentAt: new Date() },
    });
};
export const checkAndSendBirthdayOffers = async () => {
    const today = new Date();
    const customers = await prisma.customer.findMany({
        where: {
            birthday: {
                gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
            },
        },
    });
    for (const customer of customers) {
        const existingOffer = await prisma.offer.findFirst({
            where: { customerId: customer.id, type: 'birthday', createdAt: { gte: new Date(today.getFullYear(), 0, 1) } },
        });
        if (!existingOffer) {
            await prisma.offer.create({
                data: {
                    customerId: customer.id,
                    type: 'birthday',
                    description: `Happy Birthday! Enjoy ${customer.membershipTier} discount.`,
                    discountPercent: customer.membershipTier === 'Platinum' ? 20 : customer.membershipTier === 'Gold' ? 15 : customer.membershipTier === 'Silver' ? 10 : 5,
                    expiresAt: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
                },
            });
        }
    }
};
export const checkAndSendVIPOffers = async () => {
    const customers = await prisma.customer.findMany({
        where: { membershipTier: { in: ['Gold', 'Platinum'] }, totalSpent: { gte: 1000 } },
    });
    for (const customer of customers) {
        const existingOffer = await prisma.offer.findFirst({
            where: { customerId: customer.id, type: 'VIP', createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
        });
        if (!existingOffer) {
            await prisma.offer.create({
                data: {
                    customerId: customer.id,
                    type: 'VIP',
                    description: `Exclusive VIP offer for ${customer.membershipTier} members.`,
                    discountPercent: customer.membershipTier === 'Platinum' ? 25 : 20,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                },
            });
        }
    }
};
