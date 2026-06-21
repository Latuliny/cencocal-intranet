import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Inventario } from './pages/Inventario';
import { Clientes } from './pages/Clientes';
import { Despachos } from './pages/Despachos';
import { RutaPrivada } from './components/RutaPrivada';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Aquí insertamos nuestra nueva barra, que se encarga de mostrarse o no automáticamente */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inventario" element={<RutaPrivada><Inventario /></RutaPrivada>} />
          <Route path="/clientes" element={<RutaPrivada><Clientes /></RutaPrivada>} />
          <Route path="/despachos" element={<RutaPrivada><Despachos /></RutaPrivada>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;