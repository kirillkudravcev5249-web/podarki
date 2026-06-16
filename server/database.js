import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';
import { ALL_GIFTS } from './data/gifts.js';
import { ALL_ARTICLES } from './data/articles.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Создаёт и инициализирует базу данных SQLite.
 * @param {string} [dbPath] - Путь к файлу БД. Если ':memory:' — in-memory БД для тестов.
 */
export const createDb = (dbPath) => {
    const resolvedPath = dbPath ?? join(__dirname, 'users.db');
    const db = new Database(resolvedPath);

    // WAL-режим только для файловой БД (in-memory не поддерживает)
    if (resolvedPath !== ':memory:') {
        db.pragma('journal_mode = WAL');
    }

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT    UNIQUE NOT NULL,
            email    TEXT    UNIQUE NOT NULL,
            password TEXT    NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS gifts (
            id          INTEGER PRIMARY KEY,
            title       TEXT    NOT NULL,
            brand       TEXT,
            price       TEXT,
            priceNum    INTEGER,
            image       TEXT,
            category    TEXT,
            tag         TEXT,
            description TEXT,
            whyFits     TEXT
        );

        CREATE TABLE IF NOT EXISTS gift_stores (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            giftId  INTEGER NOT NULL,
            name    TEXT,
            status  TEXT,
            price   TEXT,
            url     TEXT,
            FOREIGN KEY (giftId) REFERENCES gifts(id)
        );

        CREATE TABLE IF NOT EXISTS articles (
            id      TEXT PRIMARY KEY,
            title   TEXT NOT NULL,
            excerpt TEXT,
            content TEXT
        );
    `);

    // --- Сидинг подарков ---
    const { count: giftCount } = db.prepare('SELECT COUNT(*) as count FROM gifts').get();
    if (giftCount === 0) {
        const insertGift = db.prepare(`
            INSERT INTO gifts (id, title, brand, price, priceNum, image, category, tag, description, whyFits)
            VALUES (@id, @title, @brand, @price, @priceNum, @image, @category, @tag, @description, @whyFits)
        `);
        const insertStore = db.prepare(`
            INSERT INTO gift_stores (giftId, name, status, price, url)
            VALUES (@giftId, @name, @status, @price, @url)
        `);

        const seedGifts = db.transaction(() => {
            for (const g of ALL_GIFTS) {
                insertGift.run({
                    id: g.id, title: g.title, brand: g.brand, price: g.price,
                    priceNum: g.priceNum, image: g.image, category: g.category,
                    tag: g.tag, description: g.description, whyFits: g.whyFits
                });
                for (const s of g.stores) {
                    insertStore.run({ giftId: g.id, name: s.name, status: s.status, price: s.price, url: s.url });
                }
            }
        });
        seedGifts();
    }

    // --- Сидинг статей (добавляем только отсутствующие) ---
    const insertArticle = db.prepare(`
        INSERT OR IGNORE INTO articles (id, title, excerpt, content) VALUES (@id, @title, @excerpt, @content)
    `);
    const seedArticles = db.transaction(() => {
        for (const a of ALL_ARTICLES) {
            insertArticle.run(a);
        }
    });
    seedArticles();

    // --- Авто-создание admin-пользователя ---
    const adminExists = db.prepare("SELECT id FROM users WHERE username = 'admin'").get();
    if (!adminExists) {
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const hashed = bcrypt.hashSync(adminPassword, 10);
        db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)').run(
            'admin', 'admin@localhost', hashed
        );
        console.log('✓ Admin пользователь создан (admin / ' + adminPassword + ')');
    }

    return db;
};

// Синглтон для основного приложения
const db = createDb();
console.log('✓ База данных SQLite подключена (файл: server/users.db)');
export default db;
