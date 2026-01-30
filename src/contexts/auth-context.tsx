import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';

interface User {
  id: string;
  name: string;
  role: 'MERCHANT' | 'COURIER';
  phoneE164: string;
  businesses?: { id: string; name: string }[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        api.get('/auth/me')
        .then(response => setUser(response.data))
        .catch(() => {
            localStorage.removeItem('token');
            setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
        setIsLoading(false);
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    const response = await api.get('/auth/me');
    setUser(response.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
