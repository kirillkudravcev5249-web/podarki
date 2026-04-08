import { useState, useEffect } from 'react';
import { CATEGORIES } from '../data';
import GiftCard from '../components/GiftCard';
import { fetchWbGifts } from '../services/api';

const CATEGORY_QUERY_MAP = {
    'all': 'подарок',
    'her': 'Для неё',
    'him': 'Для него',
    'kids': 'Детям',
    'tech': 'Гаджеты',
    'eco': 'Эко'
};

function Catalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [gifts, setGifts] = useState([]);
  const [priceUnder3k, setPriceUnder3k] = useState(false);
  const [price3kTo10k, setPrice3kTo10k] = useState(false);
  const [priceOver10k, setPriceOver10k] = useState(false);

  useEffect(() => {
    const query = CATEGORY_QUERY_MAP[activeCategory] || 'подарок';
    fetchWbGifts(query, 30).then(data => setGifts(data));
  }, [activeCategory]);

  const filteredGifts = gifts.filter(gift => {
    if (!priceUnder3k && !price3kTo10k && !priceOver10k) return true;
    const price = gift.priceNum;
    if (priceUnder3k && price < 3000) return true;
    if (price3kTo10k && price >= 3000 && price <= 10000) return true;
    if (priceOver10k && price > 10000) return true;
    return false;
  });

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
                checked={activeCategory === c.id}
                onChange={() => setActiveCategory(c.id)}
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
      </aside>

      <div className="catalog-content">
        <h2 style={{ marginBottom: '8px', fontSize: '2rem' }}>Каталог идей</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
          {filteredGifts.length} подарков | Ссылки ведут на WB и Ozon
        </p>
        {filteredGifts.length > 0 ? (
          <div className="grid">
            {filteredGifts.map(gift => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.2rem' }}>Подарков в этом диапазоне не найдено.</p>
            <p>Попробуйте снять один из фильтров цены.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
