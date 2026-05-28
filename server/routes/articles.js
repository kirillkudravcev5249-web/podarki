import express from 'express';
import { adminOnly } from '../middleware/adminOnly.js';

/**
 * Фабрика роутера статей.
 * @param {import('better-sqlite3').Database} db
 */
export const createArticlesRouter = (db) => {
    const router = express.Router();

    // GET /api/articles — все статьи
    router.get('/', (_req, res) => {
        const articles = db.prepare('SELECT id, title, excerpt, content FROM articles').all();
        res.json(articles);
    });

    // GET /api/articles/:id — одна статья
    router.get('/:id', (req, res) => {
        const article = db.prepare('SELECT id, title, excerpt, content FROM articles WHERE id = ?').get(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Статья не найдена' });
        }
        res.json(article);
    });

    // POST /api/articles — создать статью (только admin)
    router.post('/', adminOnly, (req, res) => {
        const { id, title, excerpt, content } = req.body;
        if (!id || !title) return res.status(400).json({ error: 'ID и заголовок обязательны' });

        const existing = db.prepare('SELECT id FROM articles WHERE id = ?').get(id);
        if (existing) return res.status(400).json({ error: 'Статья с таким ID уже существует' });

        db.prepare('INSERT INTO articles (id, title, excerpt, content) VALUES (@id, @title, @excerpt, @content)')
            .run({ id, title, excerpt, content });

        res.status(201).json({ id, title, excerpt, content });
    });

    // PUT /api/articles/:id — обновить статью (только admin)
    router.put('/:id', adminOnly, (req, res) => {
        const { id } = req.params;
        const article = db.prepare('SELECT id FROM articles WHERE id = ?').get(id);
        if (!article) return res.status(404).json({ error: 'Статья не найдена' });

        const { title, excerpt, content } = req.body;
        db.prepare('UPDATE articles SET title=@title, excerpt=@excerpt, content=@content WHERE id=@id')
            .run({ title, excerpt, content, id });

        res.json({ id, title, excerpt, content });
    });

    // DELETE /api/articles/:id — удалить статью (только admin)
    router.delete('/:id', adminOnly, (req, res) => {
        const { id } = req.params;
        const article = db.prepare('SELECT id FROM articles WHERE id = ?').get(id);
        if (!article) return res.status(404).json({ error: 'Статья не найдена' });

        db.prepare('DELETE FROM articles WHERE id = ?').run(id);
        res.json({ ok: true });
    });

    return router;
};

export default createArticlesRouter;
