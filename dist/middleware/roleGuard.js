export const roleGuard = (allowedRoles) => {
    return async (c, next) => {
        const user = c.get('user');
        if (!user || !allowedRoles.includes(user.role)) {
            return c.text('Access denied', 403);
        }
        await next();
    };
};
