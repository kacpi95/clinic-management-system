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

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  specialization: string;
  phone: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
