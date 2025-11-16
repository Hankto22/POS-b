import { prisma } from '../db/prisma.js';

export const getEmployeePerformance = async (userId: string) => {
  const shifts = await prisma.shift.findMany({
    where: { userId, isActive: false },
    orderBy: { createdAt: 'desc' },
  });

  if (shifts.length === 0) {
    return {
      totalShifts: 0,
      totalHours: 0,
      totalSales: 0,
      averageSalesPerShift: 0,
      averageHoursPerShift: 0,
      averageCustomerSatisfaction: null,
    };
  }

  const totalShifts = shifts.length;
  const totalHours = shifts.reduce((sum: number, shift: any) => sum + (shift.totalHours || 0), 0);
  const totalSales = shifts.reduce((sum: number, shift: any) => sum + shift.totalSales, 0);
  const averageSalesPerShift = totalSales / totalShifts;
  const averageHoursPerShift = totalHours / totalShifts;
  const satisfactionScores = shifts.filter((s: any) => s.customerSatisfaction !== null).map((s: any) => s.customerSatisfaction!);
  const averageCustomerSatisfaction = satisfactionScores.length > 0 ? satisfactionScores.reduce((a: number, b: number) => a + b, 0) / satisfactionScores.length : null;

  return {
    totalShifts,
    totalHours,
    totalSales,
    averageSalesPerShift,
    averageHoursPerShift,
    averageCustomerSatisfaction,
    shifts,
  };
};

export const getAllEmployeesPerformance = async () => {
  const users = await prisma.user.findMany({
    where: { isActive: true },
    include: {
      shifts: {
        where: { isActive: false },
      },
    },
  });

  const performances = await Promise.all(
    users.map(async (user: any) => ({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
      performance: await getEmployeePerformance(user.id),
    }))
  );

  return performances;
};