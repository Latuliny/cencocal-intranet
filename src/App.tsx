import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Inventario } from './pages/Inventario';
import { Clientes } from './pages/Clientes';
import { RutaPrivada } from './components/RutaPrivada'; // <-- Importamos el guardia

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Menú de navegación temporal */}
        <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Login</Link>
          <Link to="/inventario" style={{ marginRight: '15px' }}>Inventario</Link>
          <Link to="/clientes">Clientes</Link>
        </nav>

        {/* Configuración de las rutas */}
        <Routes>
          {/* Ruta pública: Cualquiera puede ver el Login */}
          <Route path="/" element={<Login />} />
          
          {/* Rutas Privadas: Protegidas por el candado */}
          <Route path="/inventario" element={<RutaPrivada><Inventario /></RutaPrivada>} />
          <Route path="/clientes" element={<RutaPrivada><Clientes /></RutaPrivada>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;