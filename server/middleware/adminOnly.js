import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'idealniy-podarok-secret-2026';

/**
 * Middleware: пропускает только пользователя с username === 'admin'.
 */
export function adminOnly(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Не авторизован' });
    }

    try {
        const token = auth.split(' ')[1];
        const payload = jwt.verify(token, JWT_SECRET);
        if (payload.username !== 'admin') {
            return res.status(403).json({ error: 'Доступ запрещён' });
        }
        req.adminUser = payload;
        next();
    } catch {
        return res.status(401).json({ error: 'Неверный или истёкший токен' });
    }
}
