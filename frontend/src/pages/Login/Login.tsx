import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';

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

  const onSubmit = async (values: LoginFormData) => {
    setError('');

    try {
      const data = await loginRequest(values);
      login(data);
      navigate('/');
    } catch (error) {
      setError(getErrorMessage(error));
    }
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

  return (
    <div className={styles.wrapper}>
      <h1>Logowanie</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
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

          {error && <p className={styles.error}>{error}</p>}

          <Button type='submit'>Zaloguj się</Button>
        </Form>
      </Formik>
    </div>
  );
}
