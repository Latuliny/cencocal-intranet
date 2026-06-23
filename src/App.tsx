import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Inventario } from './pages/Inventario';
import { Clientes } from './pages/Clientes';
import { Despachos } from './pages/Despachos';
import { DetalleProducto } from './pages/DetalleProducto';
import { RutaPrivada } from './components/RutaPrivada';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inventario" element={<RutaPrivada><Inventario /></RutaPrivada>} />
          <Route path="/inventario/:sku" element={<RutaPrivada><DetalleProducto /></RutaPrivada>} />
          <Route path="/clientes" element={<RutaPrivada><Clientes /></RutaPrivada>} />
          <Route path="/despachos" element={<RutaPrivada><Despachos /></RutaPrivada>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;