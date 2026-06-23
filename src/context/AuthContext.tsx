import { createContext, useState, useContext, ReactNode } from 'react';
import { Usuario } from '../types';

interface AuthContextType {
  user: Usuario | null;
  login: (username: string, rol: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    const savedUser = localStorage.getItem('usuario_sesion');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username: string, rol: string) => {
    const newUser = { username, rol };
    setUser(newUser);
    localStorage.setItem('usuario_sesion', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuario_sesion');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};