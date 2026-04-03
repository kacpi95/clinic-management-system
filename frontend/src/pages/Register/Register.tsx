import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';

import { useAuth } from '../../context/useAuth';
import type { RegisterFormData } from '../../types/auth.types';
import { registerRequest } from '../../utils/auth.api';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const initialValues: RegisterFormData = {
    firstName: '',
    lastName: '',
    specialization: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values: RegisterFormData) => {
    setError('');

    try {
      const data = await registerRequest(values);
      login(data);
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Register failed');
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, 'Imię jest za krótkie')
      .max(15, 'Imię jest za długie')
      .required('Imię jest wymagane'),

    lastName: Yup.string()
      .min(4, 'Nazwisko jest za krótkie')
      .max(20, 'Nazwisko jest za długie')
      .required('Nazwisko jest wymagane'),

    specialization: Yup.string().required('Specjalizacja jest wymagana'),

    phone: Yup.string()
      .min(9, 'Numer telefonu musi mieć 9 cyfr')
      .max(9, 'Numer telefonu musi mieć 9 cyfr')
      .required('Numer telefonu jest wymagany'),

    email: Yup.string()
      .email('Podaj poprawny adres email')
      .required('Email jest wymagany'),

    password: Yup.string()
      .min(6, 'Hasło musi mieć co najmniej 6 znaków')
      .max(50, 'Hasło jest za długie')
      .required('Hasło jest wymagane'),

    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required('Powtórzenie hasła jest wymagane')
            .oneOf([Yup.ref('password')], 'Hasła muszą być takie same')
        : field,
    ),
  });

  return;
}
