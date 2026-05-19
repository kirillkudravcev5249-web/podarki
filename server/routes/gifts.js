import express from 'express';

const CATEGORIES = [
    { id: 'all',  label: 'Все' },
    { id: 'her',  label: 'Для неё' },
    { id: 'him',  label: 'Для него' },
    { id: 'kids', label: 'Детям' },
    { id: 'tech', label: 'Гаджеты' },
    { id: 'eco',  label: 'Эко-подарки' },
];

/**
 * Фабрика роутера подарков.
 * @param {import('better-sqlite3').Database} db
 */
export const createGiftsRouter = (db) => {
    const router = express.Router();

    /** Получить магазины для подарка */
    const getStores = (giftId) =>
        db.prepare('SELECT name, status, price, url FROM gift_stores WHERE giftId = ?').all(giftId);

    // GET /api/gifts — список с фильтрами
    router.get('/', (req, res) => {
        const { category, minPrice, maxPrice, search, limit = 30 } = req.query;

        let query = 'SELECT * FROM gifts WHERE 1=1';
        const params = [];

        if (category && category !== 'all') {
            query += ' AND category = ?';
            params.push(category);
        }
        if (minPrice !== undefined) {
            query += ' AND priceNum >= ?';
            params.push(Number(minPrice));
        }
        if (maxPrice !== undefined) {
            query += ' AND priceNum <= ?';
            params.push(Number(maxPrice));
        }
        if (search) {
            query += ' AND (title LIKE ? OR brand LIKE ? OR description LIKE ?)';
            const s = `%${search}%`;
            params.push(s, s, s);
        }

        query += ' LIMIT ?';
        params.push(Number(limit));

        const gifts = db.prepare(query).all(...params);
        const result = gifts.map(g => ({ ...g, stores: getStores(g.id) }));
        res.json(result);
    });

    // GET /api/gifts/categories — список категорий (должен быть ДО /:id)
    router.get('/categories', (_req, res) => {
        res.json(CATEGORIES);
    });

    // GET /api/gifts/:id — один подарок
    router.get('/:id', (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Некорректный ID' });
        }

        const gift = db.prepare('SELECT * FROM gifts WHERE id = ?').get(id);
        if (!gift) {
            return res.status(404).json({ error: 'Подарок не найден' });
        }

        res.json({ ...gift, stores: getStores(id) });
    });

    return router;
};

export default createGiftsRouter;
