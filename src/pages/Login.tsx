import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación real de credenciales
    if (username === 'admin' && password === '1234') {
      login(username, 'Administrador');
      navigate('/inventario');
    } else {
      alert('❌ Error: Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: 'white' }}>
      <form onSubmit={handleLogin} style={{ background: '#1e1e1e', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', width: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#007bff' }}>Cencocal Intranet</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontSize: '14px' }}>Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }} placeholder="admin" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontSize: '14px' }}>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }} placeholder="1234" />
        </div>

        <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};