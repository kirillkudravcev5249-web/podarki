import { useParams, useNavigate } from 'react-router-dom';
import { ARTICLES } from '../data';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = ARTICLES.find(a => a.id === id);

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Статья не найдена</h2>
        <button className="btn btn-primary" onClick={() => navigate('/articles')} style={{ marginTop: '20px' }}>
          Вернуться к советам
        </button>
      </div>
    );
  }

  // Простой парсер для жирного текста **текст**
  const parseMarkdown = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button 
        className="btn btn-glass" 
        style={{ marginBottom: '30px' }} 
        onClick={() => navigate('/articles')}
      >
        ← Назад к советам
      </button>
      
      <div className="blur-glass" style={{ padding: '40px', borderRadius: '16px' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          {article.title}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--accent-secondary)', marginBottom: '40px', fontWeight: '500' }}>
          {article.excerpt}
        </p>

        <div style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          color: 'var(--text-secondary)'
        }}>
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '20px' }}>
              {parseMarkdown(paragraph)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
