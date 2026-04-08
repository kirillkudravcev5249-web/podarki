import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== password2) {
      setError('Пароли не совпадают');
      return;
    }
    setLoading(true);
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow auth-glow-1" />
      <div className="auth-bg-glow auth-glow-2" />
      <div className="auth-card blur-glass">
        <div className="auth-header">
          <div className="auth-icon">✨</div>
          <h1 className="auth-title gradient-text">Создать аккаунт</h1>
          <p className="auth-subtitle">Присоединяйся к нам!</p>
        </div>

        {error && <div className="auth-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="reg-username">Логин</label>
            <input
              id="reg-username"
              type="text"
              className="form-control"
              placeholder="Придумай логин (мин. 3 символа)"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              className="form-control"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Пароль</label>
            <input
              id="reg-password"
              type="password"
              className="form-control"
              placeholder="Минимум 6 символов"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password2">Повтори пароль</label>
            <input
              id="reg-password2"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            id="register-submit"
            type="submit"
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-spinner">⟳ Создаём аккаунт...</span>
            ) : (
              '→ Зарегистрироваться'
            )}
          </button>
        </form>

        <p className="auth-switch">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="auth-link">Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
