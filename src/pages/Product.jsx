import { useLocation, useNavigate } from 'react-router-dom';

function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const gift = location.state?.gift;

  if (!gift) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Подарок не найден. Пожалуйста, выберите товар из каталога.</h2>
        <button className="btn btn-primary" onClick={() => navigate('/catalog')} style={{ marginTop: '20px' }}>
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const imageSrc = gift.image.startsWith('http') 
    ? gift.image 
    : (window.getSafeImage ? window.getSafeImage(gift.image) : `/${gift.image}`);

  return (
    <>
      <div>
        <button 
          className="btn btn-glass" 
          style={{ marginBottom: '20px' }} 
          onClick={() => navigate('/catalog')}
        >
          ← Вернуться в каталог
        </button>
      </div>
      <div className="product-details">
        <div className="product-gallery">
          <img src={imageSrc} alt={gift.title} />
        </div>
        <div className="product-info">
          <span className="card-tag" style={{ position: 'static', display: 'inline-block', marginBottom: '10px' }}>
            {gift.tag}
          </span>
          <h1>{gift.title}</h1>
          <div className="price">{gift.price}</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            {gift.description}
          </p>
          
          <div className="why-fits">
            <strong>Почему подойдет:</strong>
            <p>{gift.whyFits}</p>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '16px' }}>
            Добавить в избранное ❤️
          </button>

          <div className="store-list">
            <h3 style={{ marginBottom: '15px' }}>Где купить:</h3>
            {gift.stores.map((store, i) => (
              <div key={i} className="store-item blur-glass" style={{ marginBottom: '10px', borderRadius: '8px' }}>
                <div>
                  <strong>{store.name}</strong>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{store.status}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{store.price}</div>
                  <a href={store.url} target="_blank" rel="noreferrer" className="btn btn-glass" style={{ padding: '6px 12px', fontSize: '0.9rem', display: 'inline-block' }}>
                    Купить
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
