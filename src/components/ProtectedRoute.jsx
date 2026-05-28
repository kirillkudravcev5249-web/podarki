import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Защищённый маршрут.
 * Если не авторизован → /login.
 * Если adminOnly и не admin → /login.
 */
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.username !== 'admin') return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
