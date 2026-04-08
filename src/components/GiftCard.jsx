import { useNavigate } from 'react-router-dom';

function GiftCard({ gift }) {
  const navigate = useNavigate();
  const isUrl = gift.image && gift.image.startsWith('http');
  const imageSrc = isUrl ? gift.image : (window.getSafeImage ? window.getSafeImage(gift.image) : `/${gift.image}`);

  return (
    <div 
      className="card blur-glass" 
      onClick={() => navigate(`/product/${gift.id}`, { state: { gift } })} 
      style={{ cursor: 'pointer' }}
    >
      <span className="card-tag">{gift.tag}</span>
      <img src={imageSrc} className="card-img" alt={gift.title} />
      <div className="card-body">
        <div className="card-price">{gift.price}</div>
        <h3 className="card-title">{gift.title}</h3>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginTop: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {gift.description}
        </p>
      </div>
    </div>
  );
}

export default GiftCard;
