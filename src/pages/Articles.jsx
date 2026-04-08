import { ARTICLES } from '../data';

function Articles() {
  return (
    <>
      <h2 className="section-title">Советы и подборки</h2>
      <div className="grid">
        {ARTICLES.map((article, i) => (
          <div key={i} className="card blur-glass" style={{ padding: 0 }}>
            <div className="card-body">
              <h3 style={{ marginBottom: '15px', color: 'var(--accent-secondary)' }}>{article.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{article.excerpt}</p>
              <button className="btn btn-glass" style={{ width: '100%' }}>Читать статью</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Articles;
