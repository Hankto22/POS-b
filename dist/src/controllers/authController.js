import { SignJWT } from 'jose';
import { prisma } from '../db/prisma.js';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret');
export const login = async (c) => {
    try {
        const { username, password } = await c.req.json();
        if (!username || !password) {
            return c.json({ error: 'Username and password are required' }, 400);
        }
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (!user || user.password !== password || !user.isActive) {
            return c.json({ error: 'Invalid credentials' }, 401);
        }
        const token = await new SignJWT({
            id: user.id,
            username: user.username,
            role: user.role,
            name: user.name,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(JWT_SECRET);
        return c.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        return c.json({ error: 'Login failed' }, 500);
    }
};
