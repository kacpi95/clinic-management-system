export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  specialization: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRequestData {
  firstName: string;
  lastName: string;
  specialization: string;
  phone: string;
  email: string;
  password: string;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  phone: string;
  userId?: number;
}

export interface User {
  id: number;
  email: string;
  role: 'DOCTOR' | 'ADMIN';
  doctor: Doctor | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}
