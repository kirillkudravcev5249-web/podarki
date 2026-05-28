import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header blur-glass">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="gradient-text">Идеальный Подарок</span>
        </Link>
        <nav className="nav-links">
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/articles">Советы</Link>
          {user?.username === 'admin' && (
            <Link to="/admin" className="nav-admin-link">⚡ Admin</Link>
          )}
        </nav>
        <div className="header-auth">
          {user ? (
            <>
              <span className="user-greeting">
                Привет, <span className="user-name">{user.username}</span>!
              </span>
              <button onClick={handleLogout} className="btn btn-glass btn-sm">
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-glass btn-sm">Войти</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
