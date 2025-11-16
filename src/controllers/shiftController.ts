import type { Context } from 'hono';
import { startShift, endShift, getShifts, getShiftById } from '../services/shiftService.js';

export const startUserShift = async (c: Context) => {
  try {
    const user = c.get('user');
    const shift = await startShift(user.id);
    return c.json(shift, 201);
  } catch (error: any) {
    console.error('Error starting shift:', error);
    return c.json({ error: error.message }, 400);
  }
};

export const endUserShift = async (c: Context) => {
  try {
    const shiftId = c.req.param('shiftId');
    const { customerSatisfaction } = await c.req.json();
    const shift = await endShift(shiftId, customerSatisfaction);
    return c.json(shift);
  } catch (error: any) {
    console.error('Error ending shift:', error);
    return c.json({ error: error.message }, 400);
  }
};

export const getUserShifts = async (c: Context) => {
  try {
    const user = c.get('user');
    const shifts = await getShifts(user.id);
    return c.json(shifts);
  } catch (error) {
    console.error('Error fetching shifts:', error);
    return c.json({ error: 'Failed to fetch shifts' }, 500);
  }
};

export const getAllShifts = async (c: Context) => {
  try {
    const shifts = await getShifts();
    return c.json(shifts);
  } catch (error) {
    console.error('Error fetching all shifts:', error);
    return c.json({ error: 'Failed to fetch shifts' }, 500);
  }
};

export const getShift = async (c: Context) => {
  try {
    const shiftId = c.req.param('shiftId');
    const shift = await getShiftById(shiftId);
    if (!shift) {
      return c.json({ error: 'Shift not found' }, 404);
    }
    return c.json(shift);
  } catch (error) {
    console.error('Error fetching shift:', error);
    return c.json({ error: 'Failed to fetch shift' }, 500);
  }
};