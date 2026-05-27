import { createContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: number;
  role: string;
  first_name?: string;
  email?: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, first_name?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jomoro_token'));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.sub, role: payload.role, email: payload.email });
      } catch {
        // token invalid, logout
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string, first_name?: string) => {
    localStorage.setItem('jomoro_token', newToken);
    setToken(newToken);
    if (first_name) {
      setUser(prev => prev ? { ...prev, first_name } : null);
    }
  };

  const logout = () => {
    localStorage.removeItem('jomoro_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
