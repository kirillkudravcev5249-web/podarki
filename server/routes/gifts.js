import express from 'express';
import { adminOnly } from '../middleware/adminOnly.js';

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
            query += ' AND (title LIKE ? OR brand LIKE ? OR description LIKE ? OR whyFits LIKE ? OR tag LIKE ?)';
            const s = `%${search}%`;
            params.push(s, s, s, s, s);
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

    // POST /api/gifts — создать подарок (только admin)
    router.post('/', adminOnly, (req, res) => {
        const { title, brand, price, priceNum, image, category, tag, description, whyFits, stores = [] } = req.body;

        if (!title) return res.status(400).json({ error: 'Название обязательно' });

        const { lastInsertRowid: giftId } = db.prepare(`
            INSERT INTO gifts (title, brand, price, priceNum, image, category, tag, description, whyFits)
            VALUES (@title, @brand, @price, @priceNum, @image, @category, @tag, @description, @whyFits)
        `).run({ title, brand, price, priceNum, image, category, tag, description, whyFits });

        const insertStore = db.prepare(
            'INSERT INTO gift_stores (giftId, name, status, price, url) VALUES (@giftId, @name, @status, @price, @url)'
        );
        for (const s of stores) {
            insertStore.run({ giftId, name: s.name, status: s.status, price: s.price, url: s.url });
        }

        const gift = db.prepare('SELECT * FROM gifts WHERE id = ?').get(giftId);
        res.status(201).json({ ...gift, stores: getStores(giftId) });
    });

    // PUT /api/gifts/:id — обновить подарок (только admin)
    router.put('/:id', adminOnly, (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Некорректный ID' });

        const existing = db.prepare('SELECT id FROM gifts WHERE id = ?').get(id);
        if (!existing) return res.status(404).json({ error: 'Подарок не найден' });

        const { title, brand, price, priceNum, image, category, tag, description, whyFits, stores = [] } = req.body;

        db.prepare(`
            UPDATE gifts SET title=@title, brand=@brand, price=@price, priceNum=@priceNum,
            image=@image, category=@category, tag=@tag, description=@description, whyFits=@whyFits
            WHERE id=@id
        `).run({ title, brand, price, priceNum, image, category, tag, description, whyFits, id });

        // Пересоздаём магазины
        db.prepare('DELETE FROM gift_stores WHERE giftId = ?').run(id);
        const insertStore = db.prepare(
            'INSERT INTO gift_stores (giftId, name, status, price, url) VALUES (@giftId, @name, @status, @price, @url)'
        );
        for (const s of stores) {
            insertStore.run({ giftId: id, name: s.name, status: s.status, price: s.price, url: s.url });
        }

        const gift = db.prepare('SELECT * FROM gifts WHERE id = ?').get(id);
        res.json({ ...gift, stores: getStores(id) });
    });

    // DELETE /api/gifts/:id — удалить подарок (только admin)
    router.delete('/:id', adminOnly, (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Некорректный ID' });

        const existing = db.prepare('SELECT id FROM gifts WHERE id = ?').get(id);
        if (!existing) return res.status(404).json({ error: 'Подарок не найден' });

        db.prepare('DELETE FROM gift_stores WHERE giftId = ?').run(id);
        db.prepare('DELETE FROM gifts WHERE id = ?').run(id);

        res.json({ ok: true });
    });

    return router;
};

export default createGiftsRouter;
