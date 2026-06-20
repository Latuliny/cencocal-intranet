import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Inventario } from './pages/Inventario';
import { Clientes } from './pages/Clientes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Menú de navegación temporal para probar las rutas */}
        <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Login</Link>
          <Link to="/inventario" style={{ marginRight: '15px' }}>Inventario</Link>
          <Link to="/clientes">Clientes</Link>
        </nav>

        {/* Configuración de las rutas */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/clientes" element={<Clientes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;