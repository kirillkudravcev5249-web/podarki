import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GiftCard from '../components/GiftCard';
import { getAllGifts } from '../services/api';

function Home() {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getAllGifts(4).then(data => setTrends(data)).catch(() => setTrends([]));
  }, []);

  const handleSmartSearch = () => {
    setAnalyzing(true);
    setTimeout(() => {
      navigate('/catalog');
      setTimeout(() => alert('Мы подобрали лучшие варианты на основе ваших ответов! (В демо-версии показывается общий каталог)'), 100);
    }, 1200);
  };

  return (
    <>
      <section className="hero">
        <h1 className="gradient-text">Найдите идеальный подарок</h1>
        <p>Умный алгоритм подберет лучший сюрприз для ваших близких за пару кликов.</p>
        
        <div className="smart-form blur-glass">
          <div className="form-group">
            <label>Для кого</label>
            <select className="form-control" defaultValue="female">
              <option value="female">Женщине</option>
              <option value="male">Мужчине</option>
              <option value="child">Ребенку</option>
            </select>
          </div>
          <div className="form-group">
            <label>Возраст</label>
            <input type="number" className="form-control" placeholder="Например: 25" min="1" max="100" />
          </div>
          <div className="form-group">
            <label>Повод</label>
            <select className="form-control">
              <option>День Рождения</option>
              <option>Новый год</option>
              <option>Годовщина</option>
              <option>Просто так</option>
            </select>
          </div>
          <div className="form-group">
            <label>Бюджет (₽)</label>
            <input type="number" className="form-control" placeholder="До..." step="1000" />
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
