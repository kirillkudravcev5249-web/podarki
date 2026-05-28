import express from 'express';
import multer from 'multer';
import { dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';
import { adminOnly } from '../middleware/adminOnly.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadsDir = join(__dirname, '..', 'uploads');

// Создаём папку uploads если не существует
mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
        const ext = extname(file.originalname) || '.jpg';
        cb(null, `${unique}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Только изображения'));
    },
});

export const createUploadRouter = () => {
    const router = express.Router();

    // POST /api/upload
    router.post('/', adminOnly, upload.single('image'), (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'Файл не получен' });
        }
        res.json({ url: `/uploads/${req.file.filename}` });
    });

    return router;
};

export default createUploadRouter;
