import { BACKEND_URL } from '../constants/api';
import type {
  LoginFormData,
  RegisterFormData,
  User,
  AuthResponse,
} from '../types/auth.types';

export const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginRequest = async (
  data: LoginFormData,
): Promise<AuthResponse> => {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData?.message || 'Login failed');
  }

  return resData;
};

export const registerRequest = async (
  data: RegisterFormData,
): Promise<AuthResponse> => {
  const response = await fetch(`${BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData?.message || 'Register failed');
  }

  return resData;
};

export const meRequest = async (): Promise<User> => {
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
