import { getEmployeePerformance, getAllEmployeesPerformance } from '../services/performanceService.js';
export const getMyPerformance = async (c) => {
    try {
        const user = c.get('user');
        const performance = await getEmployeePerformance(user.id);
        return c.json(performance);
    }
    catch (error) {
        console.error('Error fetching performance:', error);
        return c.json({ error: 'Failed to fetch performance' }, 500);
    }
};
export const getAllPerformances = async (c) => {
    try {
        const performances = await getAllEmployeesPerformance();
        return c.json(performances);
    }
    catch (error) {
        console.error('Error fetching performances:', error);
        return c.json({ error: 'Failed to fetch performances' }, 500);
    }
};
