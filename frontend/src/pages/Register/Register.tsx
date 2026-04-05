import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';

import { useAuth } from '../../context/useAuth';
import type { RegisterFormData } from '../../types/auth.types';
import { registerRequest } from '../../utils/auth.api';
import styles from './Register.module.scss';
import Button from '../../components/Button/Button';
import { getErrorMessage } from '../../utils/errors';

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
      const { confirmPassword: _confirmPassword, ...registerData } = values;
      const data = await registerRequest(registerData);
      login(data);
      navigate('/');
    } catch (error) {
      setError(getErrorMessage(error));
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
      .matches(/^\d{9}$/, 'Numer telefonu musi mieć dokładnie 9 cyfr')
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

  return (
    <div className={styles.wrapper}>
      <h1>Rejestracja</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <Field name='firstName' type='text' placeholder='Imię' />
              <div className={styles.error}>
                <ErrorMessage name='firstName' component='span' />
              </div>
            </div>

            <div className={styles.field}>
              <Field name='lastName' type='text' placeholder='Nazwisko' />
              <div className={styles.error}>
                <ErrorMessage name='lastName' component='span' />
              </div>
            </div>

            <div className={styles.field}>
              <Field
                name='specialization'
                type='text'
                placeholder='Specjalizacja'
              />
              <div className={styles.error}>
                <ErrorMessage name='specialization' component='span' />
              </div>
            </div>

            <div className={styles.field}>
              <Field name='phone' type='tel' placeholder='Numer telefonu' />
              <div className={styles.error}>
                <ErrorMessage name='phone' component='span' />
              </div>
            </div>

            <div className={styles.field}>
              <Field name='email' type='email' placeholder='Email' />
              <div className={styles.error}>
                <ErrorMessage name='email' component='span' />
              </div>
            </div>

            <div className={styles.field}>
              <Field name='password' type='password' placeholder='Hasło' />
              <div className={styles.error}>
                <ErrorMessage name='password' component='span' />
              </div>
            </div>

            <div className={styles.field}>
              <Field
                name='confirmPassword'
                type='password'
                placeholder='Powtórz hasło'
              />
              <div className={styles.error}>
                <ErrorMessage name='confirmPassword' component='span' />
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <Button type='submit'>Zarejestruj się</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
