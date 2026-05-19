import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createTestApp } from '../testApp.js';

describe('Auth API', () => {
    let app;

    beforeAll(() => {
        ({ app } = createTestApp());
    });

    // ── POST /api/auth/register ──────────────────────────────────────────────
    describe('POST /api/auth/register', () => {
        it('успешная регистрация возвращает token и user', async () => {
            const res = await request(app).post('/api/auth/register').send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toMatchObject({ username: 'testuser', email: 'test@example.com' });
        });

        it('400 — не заполнено поле password', async () => {
            const res = await request(app).post('/api/auth/register').send({
                username: 'nopass',
                email: 'nopass@example.com',
            });
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error');
        });

        it('400 — логин короче 3 символов', async () => {
            const res = await request(app).post('/api/auth/register').send({
                username: 'ab',
                email: 'short@example.com',
                password: 'password123',
            });
            expect(res.status).toBe(400);
        });

        it('400 — пароль короче 6 символов', async () => {
            const res = await request(app).post('/api/auth/register').send({
                username: 'shortpass',
                email: 'shortpass@example.com',
                password: '123',
            });
            expect(res.status).toBe(400);
        });

        it('400 — дублирующий email', async () => {
            await request(app).post('/api/auth/register').send({
                username: 'user_a',
                email: 'dup@example.com',
                password: 'password123',
            });
            const res = await request(app).post('/api/auth/register').send({
                username: 'user_b',
                email: 'dup@example.com',
                password: 'password123',
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/email/i);
        });

        it('400 — дублирующий логин', async () => {
            await request(app).post('/api/auth/register').send({
                username: 'dupname',
                email: 'dup1@example.com',
                password: 'password123',
            });
            const res = await request(app).post('/api/auth/register').send({
                username: 'dupname',
                email: 'dup2@example.com',
                password: 'password123',
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/логин/i);
        });
    });

    // ── POST /api/auth/login ─────────────────────────────────────────────────
    describe('POST /api/auth/login', () => {
        beforeAll(async () => {
            await request(app).post('/api/auth/register').send({
                username: 'loginuser',
                email: 'login@example.com',
                password: 'correctpass',
            });
        });

        it('успешный вход возвращает token', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'login@example.com',
                password: 'correctpass',
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('email', 'login@example.com');
        });

        it('401 — неверный пароль', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'login@example.com',
                password: 'wrongpass',
            });
            expect(res.status).toBe(401);
        });

        it('401 — несуществующий email', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'nobody@example.com',
                password: 'password123',
            });
            expect(res.status).toBe(401);
        });

        it('400 — пустое тело', async () => {
            const res = await request(app).post('/api/auth/login').send({});
            expect(res.status).toBe(400);
        });
    });

    // ── GET /api/auth/me ─────────────────────────────────────────────────────
    describe('GET /api/auth/me', () => {
        let token;

        beforeAll(async () => {
            const res = await request(app).post('/api/auth/register').send({
                username: 'meuser',
                email: 'me@example.com',
                password: 'mepassword',
            });
            token = res.body.token;
        });

        it('возвращает пользователя с валидным токеном', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.user).toMatchObject({ username: 'meuser', email: 'me@example.com' });
        });

        it('401 — без заголовка Authorization', async () => {
            const res = await request(app).get('/api/auth/me');
            expect(res.status).toBe(401);
        });

        it('401 — невалидный токен', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', 'Bearer totally.invalid.token');
            expect(res.status).toBe(401);
        });

        it('поле password не возвращается', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${token}`);
            expect(res.body.user).not.toHaveProperty('password');
        });
    });
});
