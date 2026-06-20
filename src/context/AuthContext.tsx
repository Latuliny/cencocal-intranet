import { createContext, useState, useContext, type ReactNode } from 'react';
import type { Usuario } from '../types';

// Definimos qué funciones y datos tendrá nuestro contexto de sesión
interface AuthContextType {
  user: Usuario | null;
  login: (username: string, rol: string) => void;
  logout: () => void;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creamos el "Proveedor" que envolverá a nuestra aplicación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);

  // Función simulada para iniciar sesión
  const login = (username: string, rol: string) => {
    setUser({ username, rol });
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Pequeño atajo (Hook) para usar esta sesión en cualquier pantalla
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};