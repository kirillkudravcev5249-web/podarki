import express from 'express';

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

    return router;
};

export default createArticlesRouter;
