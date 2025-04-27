import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);
    if (t) {
      // Optionally decode JWT for user info
      try {
        const payload = JSON.parse(atob(t.split('.')[1]));
        setUser({ id: payload.id, role: payload.role });
      } catch {}
    }
  }, []);

  const login = (t) => {
    localStorage.setItem('token', t);
    setToken(t);
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      setUser({ id: payload.id, role: payload.role });
    } catch {}
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
