import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data';
import GiftCard from '../components/GiftCard';
import { fetchGifts } from '../services/api';

function readFiltersFromParams(searchParams) {
  return {
    category: searchParams.get('category') || 'all',
    maxPrice: searchParams.get('maxPrice') || '',
    occasion: searchParams.get('occasion') || '',
  };
}

function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => readFiltersFromParams(searchParams));
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceUnder3k, setPriceUnder3k] = useState(false);
  const [price3kTo10k, setPrice3kTo10k] = useState(false);
  const [priceOver10k, setPriceOver10k] = useState(false);

  useEffect(() => {
    setFilters(readFiltersFromParams(searchParams));
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);

    const apiFilters = { limit: 30 };
    if (filters.category && filters.category !== 'all') {
      apiFilters.category = filters.category;
    }
    if (filters.maxPrice) {
      apiFilters.maxPrice = filters.maxPrice;
    }

    fetchGifts(apiFilters)
      .then(data => setGifts(data))
      .catch(() => setGifts([]))
      .finally(() => setLoading(false));
  }, [filters]);

  const filteredGifts = gifts.filter(gift => {
    if (!priceUnder3k && !price3kTo10k && !priceOver10k) return true;
    const price = gift.priceNum;
    if (price == null) return false;
    if (priceUnder3k && price < 3000) return true;
    if (price3kTo10k && price >= 3000 && price <= 10000) return true;
    if (priceOver10k && price > 10000) return true;
    return false;
  });

  const hasHomeFilters = filters.category !== 'all' || filters.maxPrice || filters.occasion;

  const updateCategory = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setSearchParams({});
  };

  const resetFilters = () => {
    setFilters({ category: 'all', maxPrice: '', occasion: '' });
    setPriceUnder3k(false);
    setPrice3kTo10k(false);
    setPriceOver10k(false);
    setSearchParams({});
  };

  return (
    <div className="catalog-layout">
      <aside className="filters-sidebar blur-glass">
        <h3 style={{ marginBottom: '20px' }}>Фильтры</h3>
        <div className="filter-group">
          <h4>Категория</h4>
          {CATEGORIES.map(c => (
            <label key={c.id} className="checkbox-label">
              <input
                type="radio"
                name="category"
                value={c.id}
                checked={filters.category === c.id}
                onChange={() => updateCategory(c.id)}
              />
              {c.label}
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h4>Цена</h4>
          <label className="checkbox-label">
            <input type="checkbox" checked={priceUnder3k} onChange={e => setPriceUnder3k(e.target.checked)} />
            до 3 000 ₽
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={price3kTo10k} onChange={e => setPrice3kTo10k(e.target.checked)} />
            3 000 — 10 000 ₽
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={priceOver10k} onChange={e => setPriceOver10k(e.target.checked)} />
            от 10 000 ₽
          </label>
        </div>
        {hasHomeFilters && (
          <button className="btn btn-glass btn-sm" style={{ width: '100%', marginTop: '16px' }} onClick={resetFilters}>
            Сбросить фильтры
          </button>
        )}
      </aside>

      <div className="catalog-content">
        <h2 style={{ marginBottom: '8px', fontSize: '2rem' }}>Каталог идей</h2>
        {hasHomeFilters && (
          <p style={{ color: 'var(--accent-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>
            Подборка по параметрам с главной
            {filters.occasion ? `: ${filters.occasion}` : ''}
            {filters.maxPrice ? `, до ${Number(filters.maxPrice).toLocaleString('ru-RU')} ₽` : ''}
          </p>
        )}
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
          {loading ? 'Загрузка...' : `${filteredGifts.length} подарков`} | Ссылки ведут на WB и Ozon
        </p>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            Подбираем подарки...
          </div>
        ) : filteredGifts.length > 0 ? (
          <div className="grid">
            {filteredGifts.map(gift => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.2rem' }}>Подарков по выбранным фильтрам не найдено.</p>
            <p style={{ marginBottom: '20px' }}>Попробуйте другую категорию, увеличить бюджет или снять фильтры цены.</p>
            {hasHomeFilters && (
              <button className="btn btn-primary" onClick={resetFilters}>
                Показать все подарки
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
