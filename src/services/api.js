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
 * Получить список подарков из бэкенда с фильтрами.
 */
export const fetchGifts = async ({ category, minPrice, maxPrice, search, limit = 30 } = {}) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (category && category !== 'all') params.set('category', category);
    if (minPrice !== undefined && minPrice !== '') params.set('minPrice', String(minPrice));
    if (maxPrice !== undefined && maxPrice !== '') params.set('maxPrice', String(maxPrice));
    if (search) params.set('search', search);

    const res = await fetch(`${API_BASE}/gifts?${params}`);
    if (!res.ok) throw new Error('Ошибка загрузки подарков');
    return res.json();
};

/**
 * Получить список подарков из бэкенда (legacy-обёртка для каталога).
 */
export const fetchWbGifts = async (query = 'подарок', limit = 30) => {
    const category = QUERY_TO_CATEGORY[query] ?? 'all';
    return fetchGifts({ category, limit });
};

/**
 * Получить несколько подарков для главной страницы.
 */
export const getAllGifts = async (limit = 4) => {
    const res = await fetch(`${API_BASE}/gifts?limit=${limit}`);
    if (!res.ok) throw new Error('Ошибка загрузки подарков');
    return res.json();
};

/**
 * Получить один подарок по ID.
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
 */
export const fetchArticleById = async (id) => {
    const res = await fetch(`${API_BASE}/articles/${id}`);
    if (!res.ok) throw new Error('Статья не найдена');
    return res.json();
};

// ─── Admin API ──────────────────────────────────────────────────────────────

const authHeaders = (token) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
});

/** Создать подарок */
export const createGift = async (data, token) => {
    const res = await fetch(`${API_BASE}/gifts`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Ошибка создания подарка');
    return json;
};

/** Обновить подарок */
export const updateGift = async (id, data, token) => {
    const res = await fetch(`${API_BASE}/gifts/${id}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Ошибка обновления подарка');
    return json;
};

/** Удалить подарок */
export const deleteGift = async (id, token) => {
    const res = await fetch(`${API_BASE}/gifts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Ошибка удаления подарка');
    return json;
};

/** Загрузить изображение */
export const uploadImage = async (file, token) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Ошибка загрузки изображения');
    return json; // { url: '/uploads/...' }
};

/** Создать статью */
export const createArticle = async (data, token) => {
    const res = await fetch(`${API_BASE}/articles`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Ошибка создания статьи');
    return json;
};

/** Обновить статью */
export const updateArticle = async (id, data, token) => {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Ошибка обновления статьи');
    return json;
};

/** Удалить статью */
export const deleteArticle = async (id, token) => {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Ошибка удаления статьи');
    return json;
};
