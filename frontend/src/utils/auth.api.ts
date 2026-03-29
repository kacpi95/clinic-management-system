import { BACKEND_URL } from '../constants/api';
import type { LoginFormData, RegisterFormData } from '../types/auth.types';

export const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginRequest = async ({ email, password }: LoginFormData) => {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Login failed');
  }

  return data;
};

export const registerRequest = async (dataRegister: RegisterFormData) => {
  const response = await fetch(`${BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataRegister),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Register failed');
  }

  return data;
};

export const meRequest = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token');
  }

  const response = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Unauthorized');
  }

  return data;
};
