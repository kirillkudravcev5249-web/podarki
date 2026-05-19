import express from 'express';
import cors from 'cors';
import db from './database.js';
import { createAuthRouter } from './routes/auth.js';
import { createGiftsRouter } from './routes/gifts.js';
import { createArticlesRouter } from './routes/articles.js';

const app = express();
const PORT = 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
app.use(express.json());

app.use('/api/auth',     createAuthRouter(db));
app.use('/api/gifts',    createGiftsRouter(db));
app.use('/api/articles', createArticlesRouter(db));

app.listen(PORT, () => {
    console.log(`✓ Сервер запущен: http://localhost:${PORT}`);
});

export default app;
