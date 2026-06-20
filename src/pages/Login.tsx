import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  // Estados para guardar lo que se escribe en las cajas de texto
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Traemos la función "login" de nuestro contexto y la herramienta de navegación
  const { login } = useAuth();
  const navigate = useNavigate();

  // Función que se ejecuta al presionar "Ingresar"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página recargue 
    
    // Verificamos que las cajas no estén vacías
    if (username.trim() !== '' && password.trim() !== '') {
      login(username, 'Vendedor'); // Guardamos la sesión
      navigate('/inventario'); // Redirigimos automáticamente al inventario
    } else {
      alert('Por favor ingresa tu usuario y contraseña.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión - Cencocal</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Usuario:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};