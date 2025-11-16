import { jwtVerify } from 'jose';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret');
export const auth = async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.text('Unauthorized', 401);
    }
    const token = authHeader.substring(7);
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        c.set('user', payload);
        await next();
    }
    catch (error) {
        return c.text('Invalid token', 401);
    }
};
