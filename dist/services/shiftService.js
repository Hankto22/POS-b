import { prisma } from '../db/prisma.js';
import { calculateCommission } from './commissionService.js';
export const startShift = async (userId) => {
    // Check if user has an active shift
    const activeShift = await prisma.shift.findFirst({
        where: { userId, isActive: true },
    });
    if (activeShift) {
        throw new Error('User already has an active shift');
    }
    const shift = await prisma.shift.create({
        data: {
            userId,
            startTime: new Date(),
        },
    });
    return shift;
};
export const endShift = async (shiftId, customerSatisfaction) => {
    const shift = await prisma.shift.findUnique({
        where: { id: shiftId },
    });
    if (!shift || !shift.isActive) {
        throw new Error('Shift not found or already ended');
    }
    const endTime = new Date();
    const totalHours = (endTime.getTime() - shift.startTime.getTime()) / (1000 * 60 * 60);
    // Calculate totalSales from sales during the shift
    const sales = await prisma.sale.findMany({
        where: {
            createdAt: {
                gte: shift.startTime,
                lte: endTime,
            },
        },
    });
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const updatedShift = await prisma.shift.update({
        where: { id: shiftId },
        data: {
            endTime,
            isActive: false,
            totalHours,
            totalSales,
            customerSatisfaction,
        },
    });
    // Calculate commission
    await calculateCommission(shiftId);
    return updatedShift;
};
export const getShifts = async (userId) => {
    const where = userId ? { userId } : {};
    return await prisma.shift.findMany({
        where,
        include: { user: true },
        orderBy: { createdAt: 'desc' },
    });
};
export const getShiftById = async (shiftId) => {
    return await prisma.shift.findUnique({
        where: { id: shiftId },
        include: { user: true },
    });
};
