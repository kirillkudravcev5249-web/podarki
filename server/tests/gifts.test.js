import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createTestApp } from '../testApp.js';

describe('Gifts API', () => {
    let app;

    beforeAll(() => {
        ({ app } = createTestApp());
    });

    // ── GET /api/gifts ───────────────────────────────────────────────────────
    describe('GET /api/gifts', () => {
        it('возвращает непустой массив подарков', async () => {
            const res = await request(app).get('/api/gifts');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('каждый подарок содержит обязательные поля', async () => {
            const res = await request(app).get('/api/gifts');
            const gift = res.body[0];
            expect(gift).toHaveProperty('id');
            expect(gift).toHaveProperty('title');
            expect(gift).toHaveProperty('brand');
            expect(gift).toHaveProperty('price');
            expect(gift).toHaveProperty('priceNum');
            expect(gift).toHaveProperty('category');
            expect(gift).toHaveProperty('stores');
            expect(Array.isArray(gift.stores)).toBe(true);
        });

        it('stores содержит поля name, status, price, url', async () => {
            const res = await request(app).get('/api/gifts');
            const store = res.body[0].stores[0];
            expect(store).toHaveProperty('name');
            expect(store).toHaveProperty('status');
            expect(store).toHaveProperty('price');
            expect(store).toHaveProperty('url');
        });

        it('фильтр category=her — только подарки для неё', async () => {
            const res = await request(app).get('/api/gifts?category=her');
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.every(g => g.category === 'her')).toBe(true);
        });

        it('фильтр category=him — только подарки для него', async () => {
            const res = await request(app).get('/api/gifts?category=him');
            expect(res.body.every(g => g.category === 'him')).toBe(true);
        });

        it('фильтр category=kids — только детские', async () => {
            const res = await request(app).get('/api/gifts?category=kids');
            expect(res.body.every(g => g.category === 'kids')).toBe(true);
        });

        it('фильтр category=tech — только гаджеты', async () => {
            const res = await request(app).get('/api/gifts?category=tech');
            expect(res.body.every(g => g.category === 'tech')).toBe(true);
        });

        it('фильтр category=eco — только эко', async () => {
            const res = await request(app).get('/api/gifts?category=eco');
            expect(res.body.every(g => g.category === 'eco')).toBe(true);
        });

        it('фильтр minPrice=5000 — все цены >= 5000', async () => {
            const res = await request(app).get('/api/gifts?minPrice=5000');
            expect(res.body.every(g => g.priceNum >= 5000)).toBe(true);
        });

        it('фильтр maxPrice=3000 — все цены <= 3000', async () => {
            const res = await request(app).get('/api/gifts?maxPrice=3000');
            expect(res.body.every(g => g.priceNum <= 3000)).toBe(true);
        });

        it('фильтр minPrice + maxPrice — все цены в диапазоне', async () => {
            const res = await request(app).get('/api/gifts?minPrice=2000&maxPrice=5000');
            expect(res.body.every(g => g.priceNum >= 2000 && g.priceNum <= 5000)).toBe(true);
        });

        it('поиск search=LEGO находит LEGO-подарки', async () => {
            const res = await request(app).get('/api/gifts?search=LEGO');
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.some(g => g.title.includes('LEGO'))).toBe(true);
        });

        it('поиск search=Sony находит Sony-подарки', async () => {
            const res = await request(app).get('/api/gifts?search=Sony');
            expect(res.body.some(g => g.brand === 'Sony')).toBe(true);
        });

        it('limit=3 ограничивает количество результатов', async () => {
            const res = await request(app).get('/api/gifts?limit=3');
            expect(res.body.length).toBeLessThanOrEqual(3);
        });

        it('несуществующая категория возвращает пустой массив', async () => {
            const res = await request(app).get('/api/gifts?category=nonexistent');
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });

        it('комбинация category + maxPrice работает корректно', async () => {
            const res = await request(app).get('/api/gifts?category=her&maxPrice=5000');
            expect(res.body.every(g => g.category === 'her' && g.priceNum <= 5000)).toBe(true);
        });
    });

    // ── GET /api/gifts/categories ────────────────────────────────────────────
    describe('GET /api/gifts/categories', () => {
        it('возвращает массив категорий', async () => {
            const res = await request(app).get('/api/gifts/categories');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('каждая категория содержит id и label', async () => {
            const res = await request(app).get('/api/gifts/categories');
            res.body.forEach(cat => {
                expect(cat).toHaveProperty('id');
                expect(cat).toHaveProperty('label');
            });
        });

        it('содержит категорию "all"', async () => {
            const res = await request(app).get('/api/gifts/categories');
            expect(res.body.some(c => c.id === 'all')).toBe(true);
        });

        it('содержит все 6 ожидаемых категорий', async () => {
            const res = await request(app).get('/api/gifts/categories');
            const ids = res.body.map(c => c.id);
            expect(ids).toEqual(expect.arrayContaining(['all', 'her', 'him', 'kids', 'tech', 'eco']));
        });
    });

    // ── GET /api/gifts/:id ───────────────────────────────────────────────────
    describe('GET /api/gifts/:id', () => {
        it('возвращает подарок по существующему ID', async () => {
            const res = await request(app).get('/api/gifts/1');
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(1);
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('stores');
        });

        it('stores подарка не пустые', async () => {
            const res = await request(app).get('/api/gifts/1');
            expect(Array.isArray(res.body.stores)).toBe(true);
            expect(res.body.stores.length).toBeGreaterThan(0);
        });

        it('404 для несуществующего ID', async () => {
            const res = await request(app).get('/api/gifts/99999');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('error');
        });

        it('400 для нечислового ID', async () => {
            const res = await request(app).get('/api/gifts/abc');
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error');
        });

        it('возвращает подарок с ID=14 (LEGO)', async () => {
            const res = await request(app).get('/api/gifts/14');
            expect(res.status).toBe(200);
            expect(res.body.title).toContain('LEGO');
        });
    });
});
