import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../services/api';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticles()
      .then(data => setArticles(data))
      .catch(() => setError('Не удалось загрузить советы'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
        Загрузка советов...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="section-title">Советы и подборки</h2>
      <div className="grid">
        {articles.map(article => (
          <div key={article.id} className="card blur-glass" style={{ padding: 0 }}>
            <div className="card-body">
              <h3 style={{ marginBottom: '15px', color: 'var(--accent-secondary)' }}>{article.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{article.excerpt}</p>
              <Link to={`/articles/${article.id}`} className="btn btn-glass" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                Читать статью
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Articles;
