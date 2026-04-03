import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { loginRequest } from '../../utils/auth.api';
import { useAuth } from '../../context/useAuth';
import styles from './Login.module.scss';
import type { LoginFormData } from '../../types/auth.types';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors: Partial<LoginFormData> = {};
      if (!values.email) {
        errors.email = 'Email jest wymagany';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Podaj poprawny adres email';
      }
      if (!values.password) {
        errors.password = 'Hasło jest wymagane';
      } else if (values.password.length < 6) {
        errors.password = 'Hasło musi mieć 6 znaków';
      }
      return errors;
    },

    onSubmit: async (values) => {
      setError('');

      try {
        const data = await loginRequest(values);
        login(data);
        navigate('/');
      } catch (error: any) {
        setError(error.message || 'Login failed');
      }
    },
  });
  return <h1>Logownaie</h1>;
}
