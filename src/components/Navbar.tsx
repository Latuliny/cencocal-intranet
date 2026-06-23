import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Función para cerrar sesión y volver al login
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Si no hay un usuario activo (ej: estamos en el Login), ocultamos la barra
  if (!user) return null;

  return (
    <nav style={{ background: '#2894a7', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '30px' }}>Cencocal Intranet</span>
        <Link to="/inventario" style={{ color: 'white', textDecoration: 'none', marginRight: '20px', fontSize: '15px' }}>📦 Inventario</Link>
        <Link to="/clientes" style={{ color: 'white', textDecoration: 'none', marginRight: '20px', fontSize: '15px' }}>👥 Clientes</Link>
        <Link to="/despachos" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>🚚 Despachos</Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '15px', fontSize: '14px' }}>Hola, <strong>{user.username}</strong> ({user.rol})</span>
        <button onClick={handleLogout} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};