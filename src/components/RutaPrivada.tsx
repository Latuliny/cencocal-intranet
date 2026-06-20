import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RutaPrivada = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  // Si no hay un usuario guardado en la memoria, lo devolvemos a la fuerza al Login ("/")
  if (!user) {
    return <Navigate to="/" />;
  }

  // Si todo está en orden, lo dejamos pasar a la pantalla que pidió
  return <>{children}</>;
};