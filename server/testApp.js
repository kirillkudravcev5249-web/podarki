import express from 'express';
import cors from 'cors';
import { createDb } from './database.js';
import { createAuthRouter } from './routes/auth.js';
import { createGiftsRouter } from './routes/gifts.js';
import { createArticlesRouter } from './routes/articles.js';

/**
 * Создаёт тестовое Express-приложение с изолированной in-memory базой данных.
 * Используется в тестах через supertest.
 */
export const createTestApp = () => {
    const db = createDb(':memory:');
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth',     createAuthRouter(db));
    app.use('/api/gifts',    createGiftsRouter(db));
    app.use('/api/articles', createArticlesRouter(db));

    return { app, db };
};
