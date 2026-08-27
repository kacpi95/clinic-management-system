import { Formik, Form, ErrorMessage, Field, type FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';
import { loginRequest } from '../../utils/auth.api';
import { useAuth } from '../../context/useAuth';
import styles from './Login.module.scss';
import type { LoginFormData } from '../../types/auth.types';
import Button from '../../components/Button/Button';
import { getErrorMessage } from '../../utils/errors';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const initialValues: LoginFormData = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Podaj poprawny adres email')
      .required('Email jest wymagany'),
    password: Yup.string()
      .min(6, 'Hasło musi mieć co najmniej 6 znaków')
      .max(50, 'Hasło jest za długie')
      .required('Hasło jest wymagane'),
  });

  const onSubmit = async (
    values: LoginFormData,
    { setSubmitting }: FormikHelpers<LoginFormData>,
  ) => {
    setError('');

    try {
      const data = await loginRequest(values);

      login(data);

      navigate('/dashboard', { replace: true });
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.logo}>
        <img src={logo} alt='Clinica Atelier' />
      </div>

      <h1 className={styles.title}>Clinica Atelier</h1>
      <p className={styles.subtitle}>Bezpieczny dostęp do usług medycznych</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor='email' className={styles.label}>
                Email
              </label>

              <Field
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='name@clinic.com'
                className={styles.input}
              />

              <div className={styles.error}>
                <ErrorMessage name='email' component='span' />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor='password' className={styles.label}>
                Hasło
              </label>

              <Field
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                placeholder='••••••••'
                className={styles.input}
              />

              <div className={styles.error}>
                <ErrorMessage name='password' component='span' />
              </div>
            </div>

            {error && <p className={styles.submitError}>{error}</p>}

            <Button
              type='submit'
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </Form>
        )}
      </Formik>

      <div className={styles.switchAuth}>
        <span>Nowy użytkownik?</span>
        <Link to='/register'>Załóż konto</Link>
      </div>
    </section>
  );
}
