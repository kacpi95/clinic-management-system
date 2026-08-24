import type { User, AuthResponse } from './../types/auth.types';
import { createContext } from 'react';

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
