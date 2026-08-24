import { useState, type ReactNode } from 'react';

import { AuthContext } from './AuthContext';
import type { User, AuthResponse } from '../types/auth.types';
import { meRequest } from '../utils/auth.api';

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token'),
  );
  const [user, setUser] = useState<User | null>(() => {
    try {
      const localUser = localStorage.getItem('user');

      return localUser ? JSON.parse(localUser) : null;
    } catch {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    }
  });

  const login = ({ token, user }: AuthResponse) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  const refreshUser = async () => {
    const freshUser = await meRequest();
    setUser(freshUser);
    localStorage.setItem('user', JSON.stringify(freshUser));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
