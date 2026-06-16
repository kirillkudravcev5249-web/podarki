import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GiftCard from '../components/GiftCard';
import { getAllGifts } from '../services/api';

const RECIPIENT_MAP = {
  female: 'her',
  male: 'him',
  child: 'kids',
};

function Home() {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [trends, setTrends] = useState([]);
  const [recipient, setRecipient] = useState('female');
  const [age, setAge] = useState('');
  const [occasion, setOccasion] = useState('День Рождения');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    getAllGifts(4).then(data => setTrends(data)).catch(() => setTrends([]));
  }, []);

  const handleSmartSearch = () => {
    setAnalyzing(true);

    const params = new URLSearchParams();
    const category = RECIPIENT_MAP[recipient];
    if (category) params.set('category', category);
    if (budget) params.set('maxPrice', budget);
    if (occasion && occasion !== 'Просто так') params.set('occasion', occasion);
    if (age) params.set('age', age);

    setTimeout(() => {
      navigate(`/catalog?${params.toString()}`);
      setAnalyzing(false);
    }, 800);
  };

  return (
    <>
      <section className="hero">
        <h1 className="gradient-text">Найдите идеальный подарок</h1>
        <p>Умный алгоритм подберет лучший сюрприз для ваших близких за пару кликов.</p>
        
        <div className="smart-form blur-glass">
          <div className="form-group">
            <label>Для кого</label>
            <select
              className="form-control"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
            >
              <option value="female">Женщине</option>
              <option value="male">Мужчине</option>
              <option value="child">Ребенку</option>
            </select>
          </div>
          <div className="form-group">
            <label>Возраст</label>
            <input
              type="number"
              className="form-control"
              placeholder="Например: 25"
              min="1"
              max="100"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Повод</label>
            <select
              className="form-control"
              value={occasion}
              onChange={e => setOccasion(e.target.value)}
            >
              <option>День Рождения</option>
              <option>Новый год</option>
              <option>Годовщина</option>
              <option>Просто так</option>
            </select>
          </div>
          <div className="form-group">
            <label>Бюджет (₽)</label>
            <input
              type="number"
              className="form-control"
              placeholder="До..."
              step="1000"
              value={budget}
              onChange={e => setBudget(e.target.value)}
            />
          </div>
          <div className="smart-form-action">
            <button 
              className="btn btn-primary" 
              onClick={handleSmartSearch}
              style={{ opacity: analyzing ? 0.7 : 1 }}
              disabled={analyzing}
            >
              {analyzing ? "Анализируем..." : "Подобрать подарок"}
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Тренды недели</h2>
        <div className="grid">
          {trends.map(gift => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
