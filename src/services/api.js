const API_BASE = 'http://localhost:3001/api';

// Маппинг query-строк (используются в Catalog.jsx) → category ID
const QUERY_TO_CATEGORY = {
    'подарок': 'all',
    'Для неё': 'her',
    'Для него': 'him',
    'Детям': 'kids',
    'Гаджеты': 'tech',
    'Эко': 'eco',
};

/**
 * Получить список подарков из бэкенда.
 * @param {string} query - Строка категории (как в CATEGORY_QUERY_MAP в Catalog.jsx)
 * @param {number} limit - Максимальное количество
 */
export const fetchWbGifts = async (query = 'подарок', limit = 30) => {
    const category = QUERY_TO_CATEGORY[query] ?? 'all';
    const params = new URLSearchParams({ limit });
    if (category !== 'all') params.set('category', category);

    const res = await fetch(`${API_BASE}/gifts?${params}`);
    if (!res.ok) throw new Error('Ошибка загрузки подарков');
    return res.json();
};

/**
 * Получить несколько подарков для главной страницы.
 * @param {number} limit
 */
export const getAllGifts = async (limit = 4) => {
    const res = await fetch(`${API_BASE}/gifts?limit=${limit}`);
    if (!res.ok) throw new Error('Ошибка загрузки подарков');
    return res.json();
};

/**
 * Получить один подарок по ID.
 * @param {number} id
 */
export const getGiftById = async (id) => {
    const res = await fetch(`${API_BASE}/gifts/${id}`);
    if (!res.ok) throw new Error('Подарок не найден');
    return res.json();
};

/**
 * Получить список категорий из бэкенда.
 */
export const fetchCategories = async () => {
    const res = await fetch(`${API_BASE}/gifts/categories`);
    if (!res.ok) throw new Error('Ошибка загрузки категорий');
    return res.json();
};

/**
 * Получить все статьи.
 */
export const fetchArticles = async () => {
    const res = await fetch(`${API_BASE}/articles`);
    if (!res.ok) throw new Error('Ошибка загрузки статей');
    return res.json();
};

/**
 * Получить одну статью по ID.
 * @param {string} id
 */
export const fetchArticleById = async (id) => {
    const res = await fetch(`${API_BASE}/articles/${id}`);
    if (!res.ok) throw new Error('Статья не найдена');
    return res.json();
};
