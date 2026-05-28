import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  fetchWbGifts, createGift, updateGift, deleteGift, uploadImage,
  fetchArticles, createArticle, updateArticle, deleteArticle,
} from '../services/api';

const CATEGORIES = [
  { id: 'her',  label: 'Для неё' },
  { id: 'him',  label: 'Для него' },
  { id: 'kids', label: 'Детям' },
  { id: 'tech', label: 'Гаджеты' },
  { id: 'eco',  label: 'Эко-подарки' },
];

const EMPTY_GIFT = {
  title: '', brand: '', category: 'her', tag: '',
  price: '', priceNum: '', image: '', description: '', whyFits: '',
  stores: [
    { name: 'Wildberries', status: 'В наличии', price: '', url: '' },
    { name: 'Ozon',        status: 'В наличии', price: '', url: '' },
  ],
};

const EMPTY_ARTICLE = { id: '', title: '', excerpt: '', content: '' };

// ─── Helpers ────────────────────────────────────────────────────────────────

function getToken() {
  return localStorage.getItem('token') || '';
}

function imageUrl(src) {
  if (!src) return '';
  if (src.startsWith('http') || src.startsWith('/uploads')) return src;
  return src;
}

// ─── Gift Form ───────────────────────────────────────────────────────────────

function GiftForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const [imgMode, setImgMode] = useState('url'); // 'url' | 'file'
  const [preview, setPreview] = useState(initial.image || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setStore = (i, key, val) =>
    setForm(f => {
      const stores = [...f.stores];
      stores[i] = { ...stores[i], [key]: val };
      return { ...f, stores };
    });

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await uploadImage(file, getToken());
      const fullUrl = `http://localhost:3001${url}`;
      setForm(f => ({ ...f, image: fullUrl }));
      setPreview(fullUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        priceNum: form.priceNum ? Number(form.priceNum) : null,
      };
      await onSave(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-form-grid">
        <div className="form-group">
          <label>Название *</label>
          <input className="form-control" value={form.title} onChange={e => set('title', e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Бренд</label>
          <input className="form-control" value={form.brand} onChange={e => set('brand', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Категория</label>
          <select className="form-control" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Тег</label>
          <input className="form-control" value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="Хит сезона" />
        </div>
        <div className="form-group">
          <label>Цена (текст)</label>
          <input className="form-control" value={form.price} onChange={e => set('price', e.target.value)} placeholder="5 490 ₽" />
        </div>
        <div className="form-group">
          <label>Цена (число)</label>
          <input className="form-control" type="number" value={form.priceNum} onChange={e => set('priceNum', e.target.value)} placeholder="5490" />
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '1rem' }}>
        <label>Описание</label>
        <textarea className="form-control" rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Почему подойдёт</label>
        <textarea className="form-control" rows={2} value={form.whyFits} onChange={e => set('whyFits', e.target.value)} />
      </div>

      {/* Image */}
      <div className="admin-img-section">
        <label>Изображение</label>
        <div className="admin-img-toggle">
          <button type="button" className={`admin-tab-btn ${imgMode === 'url' ? 'active' : ''}`} onClick={() => setImgMode('url')}>🔗 URL</button>
          <button type="button" className={`admin-tab-btn ${imgMode === 'file' ? 'active' : ''}`} onClick={() => setImgMode('file')}>📁 Файл</button>
        </div>
        {imgMode === 'url' ? (
          <input
            className="form-control"
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={e => { set('image', e.target.value); setPreview(e.target.value); }}
          />
        ) : (
          <div className="admin-file-upload" onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
            {uploading ? <span>Загрузка...</span> : <span>📎 Нажмите чтобы выбрать файл</span>}
          </div>
        )}
        {preview && (
          <div className="admin-img-preview">
            <img src={imageUrl(preview)} alt="Preview" onError={e => e.target.style.display = 'none'} />
          </div>
        )}
      </div>

      {/* Stores */}
      <div className="admin-stores">
        <label style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Магазины</label>
        {form.stores.map((s, i) => (
          <div key={i} className="admin-store-row">
            <span className="store-name-badge">{s.name}</span>
            <select className="form-control store-status" value={s.status} onChange={e => setStore(i, 'status', e.target.value)}>
              <option>В наличии</option>
              <option>Под заказ</option>
              <option>Нет в наличии</option>
            </select>
            <input className="form-control store-price" placeholder="Цена" value={s.price} onChange={e => setStore(i, 'price', e.target.value)} />
            <input className="form-control store-url" placeholder="Ссылка" value={s.url} onChange={e => setStore(i, 'url', e.target.value)} />
          </div>
        ))}
      </div>

      <div className="admin-form-actions">
        <button type="button" className="btn btn-glass" onClick={onCancel}>Отмена</button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Сохранение...' : '💾 Сохранить'}
        </button>
      </div>
    </form>
  );
}

// ─── Article Form ────────────────────────────────────────────────────────────

function ArticleForm({ initial, isEdit, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <div className="admin-error">{error}</div>}

      <div className="form-group">
        <label>ID (slug) {isEdit && <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}> — нельзя изменить</span>}</label>
        <input
          className="form-control"
          value={form.id}
          onChange={e => set('id', e.target.value)}
          disabled={isEdit}
          placeholder="eco-new-year"
          required
        />
      </div>
      <div className="form-group">
        <label>Заголовок *</label>
        <input className="form-control" value={form.title} onChange={e => set('title', e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Краткое описание</label>
        <input className="form-control" value={form.excerpt} onChange={e => set('excerpt', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Контент</label>
        <textarea className="form-control" rows={8} value={form.content} onChange={e => set('content', e.target.value)} style={{ resize: 'vertical' }} />
      </div>

      <div className="admin-form-actions">
        <button type="button" className="btn btn-glass" onClick={onCancel}>Отмена</button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Сохранение...' : '💾 Сохранить'}
        </button>
      </div>
    </form>
  );
}

// ─── Main AdminPanel ─────────────────────────────────────────────────────────

function AdminPanel() {
  const { user } = useAuth();
  const [tab, setTab] = useState('gifts'); // 'gifts' | 'articles'

  // Gifts state
  const [gifts, setGifts] = useState([]);
  const [giftsLoading, setGiftsLoading] = useState(true);
  const [giftForm, setGiftForm] = useState(null); // null | { mode: 'create'|'edit', data }

  // Articles state
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articleForm, setArticleForm] = useState(null);

  const [notification, setNotification] = useState('');

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Load gifts
  useEffect(() => {
    setGiftsLoading(true);
    fetchWbGifts('подарок', 200)
      .then(setGifts)
      .finally(() => setGiftsLoading(false));
  }, []);

  // Load articles
  useEffect(() => {
    setArticlesLoading(true);
    fetchArticles()
      .then(setArticles)
      .finally(() => setArticlesLoading(false));
  }, []);

  // ── Gifts handlers ──
  const handleSaveGift = async (data) => {
    const token = getToken();
    if (giftForm.mode === 'create') {
      const created = await createGift(data, token);
      setGifts(g => [created, ...g]);
      notify('✅ Подарок создан');
    } else {
      const updated = await updateGift(giftForm.data.id, data, token);
      setGifts(g => g.map(x => x.id === updated.id ? updated : x));
      notify('✅ Подарок обновлён');
    }
    setGiftForm(null);
  };

  const handleDeleteGift = async (id) => {
    if (!window.confirm('Удалить подарок?')) return;
    await deleteGift(id, getToken());
    setGifts(g => g.filter(x => x.id !== id));
    notify('🗑 Подарок удалён');
  };

  // ── Articles handlers ──
  const handleSaveArticle = async (data) => {
    const token = getToken();
    if (articleForm.mode === 'create') {
      const created = await createArticle(data, token);
      setArticles(a => [created, ...a]);
      notify('✅ Статья создана');
    } else {
      const updated = await updateArticle(articleForm.data.id, data, token);
      setArticles(a => a.map(x => x.id === updated.id ? updated : x));
      notify('✅ Статья обновлена');
    }
    setArticleForm(null);
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Удалить статью?')) return;
    await deleteArticle(id, getToken());
    setArticles(a => a.filter(x => x.id !== id));
    notify('🗑 Статья удалена');
  };

  return (
    <div className="admin-panel">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title"><span className="gradient-text">⚡ Admin</span> панель</h1>
          <p className="admin-subtitle">Добро пожаловать, <strong>{user?.username}</strong></p>
        </div>
        <div className="admin-stats">
          <div className="admin-stat-chip">🎁 {gifts.length} подарков</div>
          <div className="admin-stat-chip">📝 {articles.length} статей</div>
        </div>
      </div>

      {/* Notification */}
      {notification && <div className="admin-notification">{notification}</div>}

      {/* Tabs */}
      <div className="admin-tabs">
        <button id="tab-gifts" className={`admin-tab ${tab === 'gifts' ? 'active' : ''}`} onClick={() => { setTab('gifts'); setGiftForm(null); }}>
          🎁 Подарки
        </button>
        <button id="tab-articles" className={`admin-tab ${tab === 'articles' ? 'active' : ''}`} onClick={() => { setTab('articles'); setArticleForm(null); }}>
          📝 Статьи
        </button>
      </div>

      {/* ── Gifts Tab ── */}
      {tab === 'gifts' && (
        <div className="admin-content">
          {giftForm ? (
            <div className="admin-form-card blur-glass">
              <div className="admin-form-header">
                <h2>{giftForm.mode === 'create' ? '➕ Новый подарок' : '✏️ Редактировать подарок'}</h2>
              </div>
              <GiftForm
                initial={giftForm.mode === 'create' ? EMPTY_GIFT : {
                  ...giftForm.data,
                  stores: giftForm.data.stores?.length
                    ? giftForm.data.stores
                    : [
                        { name: 'Wildberries', status: 'В наличии', price: '', url: '' },
                        { name: 'Ozon',        status: 'В наличии', price: '', url: '' },
                      ],
                }}
                onSave={handleSaveGift}
                onCancel={() => setGiftForm(null)}
              />
            </div>
          ) : (
            <div className="admin-list-section">
              <div className="admin-list-header">
                <h2>Все подарки</h2>
                <button id="btn-add-gift" className="btn btn-primary btn-sm" onClick={() => setGiftForm({ mode: 'create', data: null })}>
                  ➕ Добавить подарок
                </button>
              </div>
              {giftsLoading ? (
                <div className="admin-loading">Загрузка...</div>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Категория</th>
                        <th>Цена</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gifts.map(g => (
                        <tr key={g.id}>
                          <td className="admin-td-id">#{g.id}</td>
                          <td>
                            {g.image && (
                              <img
                                src={g.image}
                                alt={g.title}
                                className="admin-thumb"
                                onError={e => e.target.style.display = 'none'}
                              />
                            )}
                          </td>
                          <td className="admin-td-title">
                            <span className="admin-gift-title">{g.title}</span>
                            {g.brand && <span className="admin-gift-brand">{g.brand}</span>}
                          </td>
                          <td>
                            <span className="admin-category-badge">
                              {CATEGORIES.find(c => c.id === g.category)?.label || g.category}
                            </span>
                          </td>
                          <td className="admin-td-price">{g.price}</td>
                          <td>
                            <div className="admin-actions">
                              <button
                                className="btn-icon btn-edit"
                                title="Редактировать"
                                onClick={() => setGiftForm({ mode: 'edit', data: g })}
                              >✏️</button>
                              <button
                                className="btn-icon btn-delete"
                                title="Удалить"
                                onClick={() => handleDeleteGift(g.id)}
                              >🗑</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Articles Tab ── */}
      {tab === 'articles' && (
        <div className="admin-content">
          {articleForm ? (
            <div className="admin-form-card blur-glass">
              <div className="admin-form-header">
                <h2>{articleForm.mode === 'create' ? '➕ Новая статья' : '✏️ Редактировать статью'}</h2>
              </div>
              <ArticleForm
                initial={articleForm.mode === 'create' ? EMPTY_ARTICLE : articleForm.data}
                isEdit={articleForm.mode === 'edit'}
                onSave={handleSaveArticle}
                onCancel={() => setArticleForm(null)}
              />
            </div>
          ) : (
            <div className="admin-list-section">
              <div className="admin-list-header">
                <h2>Все статьи</h2>
                <button id="btn-add-article" className="btn btn-primary btn-sm" onClick={() => setArticleForm({ mode: 'create', data: null })}>
                  ➕ Добавить статью
                </button>
              </div>
              {articlesLoading ? (
                <div className="admin-loading">Загрузка...</div>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Заголовок</th>
                        <th>Анонс</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map(a => (
                        <tr key={a.id}>
                          <td className="admin-td-id">{a.id}</td>
                          <td className="admin-td-title">{a.title}</td>
                          <td className="admin-td-excerpt">{a.excerpt}</td>
                          <td>
                            <div className="admin-actions">
                              <button
                                className="btn-icon btn-edit"
                                title="Редактировать"
                                onClick={() => setArticleForm({ mode: 'edit', data: a })}
                              >✏️</button>
                              <button
                                className="btn-icon btn-delete"
                                title="Удалить"
                                onClick={() => handleDeleteArticle(a.id)}
                              >🗑</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
