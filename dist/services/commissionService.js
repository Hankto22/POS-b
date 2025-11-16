import { prisma } from '../db/prisma.js';
const COMMISSION_RATE = 0.05; // 5% commission
export const calculateCommission = async (shiftId) => {
    const shift = await prisma.shift.findUnique({
        where: { id: shiftId },
        include: { commissions: true },
    });
    if (!shift) {
        throw new Error('Shift not found');
    }
    if (shift.commissions.length > 0) {
        throw new Error('Commission already calculated for this shift');
    }
    const amount = shift.totalSales * COMMISSION_RATE;
    const commission = await prisma.commission.create({
        data: {
            shiftId,
            amount,
        },
    });
    return commission;
};
export const getCommissions = async (userId) => {
    const where = userId ? { shift: { userId } } : {};
    return await prisma.commission.findMany({
        where,
        include: { shift: { include: { user: true } } },
        orderBy: { createdAt: 'desc' },
    });
};
export const getCommissionById = async (commissionId) => {
    return await prisma.commission.findUnique({
        where: { id: commissionId },
        include: { shift: { include: { user: true } } },
    });
};
