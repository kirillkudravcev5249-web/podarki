import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createTestApp } from '../testApp.js';

describe('Articles API', () => {
    let app;

    beforeAll(() => {
        ({ app } = createTestApp());
    });

    // ── GET /api/articles ────────────────────────────────────────────────────
    describe('GET /api/articles', () => {
        it('возвращает непустой массив статей', async () => {
            const res = await request(app).get('/api/articles');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('каждая статья содержит обязательные поля', async () => {
            const res = await request(app).get('/api/articles');
            const article = res.body[0];
            expect(article).toHaveProperty('id');
            expect(article).toHaveProperty('title');
            expect(article).toHaveProperty('excerpt');
            expect(article).toHaveProperty('content');
        });

        it('возвращает ровно 3 статьи (по данным сидинга)', async () => {
            const res = await request(app).get('/api/articles');
            expect(res.body.length).toBe(3);
        });

        it('excerpt не пустой', async () => {
            const res = await request(app).get('/api/articles');
            res.body.forEach(a => {
                expect(a.excerpt.length).toBeGreaterThan(0);
            });
        });
    });

    // ── GET /api/articles/:id ────────────────────────────────────────────────
    describe('GET /api/articles/:id', () => {
        it('возвращает статью "packing-style"', async () => {
            const res = await request(app).get('/api/articles/packing-style');
            expect(res.status).toBe(200);
            expect(res.body.id).toBe('packing-style');
            expect(res.body.title).toContain('упаковать');
        });

        it('возвращает статью "trends-2026"', async () => {
            const res = await request(app).get('/api/articles/trends-2026');
            expect(res.status).toBe(200);
            expect(res.body.id).toBe('trends-2026');
        });

        it('возвращает статью "eco-new-year"', async () => {
            const res = await request(app).get('/api/articles/eco-new-year');
            expect(res.status).toBe(200);
            expect(res.body.id).toBe('eco-new-year');
        });

        it('content содержит текст', async () => {
            const res = await request(app).get('/api/articles/packing-style');
            expect(res.body.content.length).toBeGreaterThan(10);
        });

        it('404 для несуществующей статьи', async () => {
            const res = await request(app).get('/api/articles/nonexistent-article');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('error');
        });

        it('404 для пустого slug', async () => {
            const res = await request(app).get('/api/articles/___missing___');
            expect(res.status).toBe(404);
        });
    });
});
