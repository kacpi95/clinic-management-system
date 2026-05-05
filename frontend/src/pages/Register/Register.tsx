import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';
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
      navigate('/login');
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
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <section className={styles.register}>
          <div className={styles.infoPanel}>
            <p className={styles.eyebrow}>DOSTĘP DLA SPECJALISTÓW</p>

            <h1 className={styles.heading}>
              Podnieś standard zarządzania placówką medyczną.
            </h1>

            <p className={styles.description}>
              Dołącz do nowoczesnego systemu stworzonego dla specjalistów.
              Zarządzaj pacjentami, wizytami i dokumentacją w jednym miejscu.
            </p>

            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <h3>Bezpieczny dostęp</h3>
                <p>Szyfrowanie danych i bezpieczne logowanie dla personelu.</p>
              </div>

              <div className={styles.featureCard}>
                <h3>Gotowe do pracy</h3>
                <p>Intuicyjny panel do zarządzania wizytami i pacjentami.</p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.logo}>
                <img src={logo} alt='Logo' />
              </div>
              <h2 className={styles.title}>Utwórz konto</h2>
              <p className={styles.subtitle}>
                Wprowadź dane, aby rozpocząć korzystanie z systemu.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor='firstName' className={styles.label}>
                      Imię
                    </label>
                    <Field
                      id='firstName'
                      name='firstName'
                      type='text'
                      placeholder='Np. Anna'
                      className={styles.input}
                    />
                    <div className={styles.error}>
                      <ErrorMessage name='firstName' component='span' />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor='lastName' className={styles.label}>
                      Nazwisko
                    </label>
                    <Field
                      id='lastName'
                      name='lastName'
                      type='text'
                      placeholder='Np. Kowalska'
                      className={styles.input}
                    />
                    <div className={styles.error}>
                      <ErrorMessage name='lastName' component='span' />
                    </div>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor='specialization' className={styles.label}>
                    Specjalizacja
                  </label>
                  <Field
                    id='specialization'
                    name='specialization'
                    type='text'
                    placeholder='Np. Kardiologia'
                    className={styles.input}
                  />
                  <div className={styles.error}>
                    <ErrorMessage name='specialization' component='span' />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor='phone' className={styles.label}>
                    Numer telefonu
                  </label>
                  <Field
                    id='phone'
                    name='phone'
                    type='tel'
                    placeholder='123456789'
                    className={styles.input}
                  />
                  <div className={styles.error}>
                    <ErrorMessage name='phone' component='span' />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor='email' className={styles.label}>
                    Adres e-mail
                  </label>
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    placeholder='twoj@email.pl'
                    className={styles.input}
                  />
                  <div className={styles.error}>
                    <ErrorMessage name='email' component='span' />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor='password' className={styles.label}>
                      Hasło
                    </label>
                    <Field
                      id='password'
                      name='password'
                      type='password'
                      placeholder='Minimum 6 znaków'
                      className={styles.input}
                    />
                    <div className={styles.error}>
                      <ErrorMessage name='password' component='span' />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor='confirmPassword' className={styles.label}>
                      Powtórz hasło
                    </label>
                    <Field
                      id='confirmPassword'
                      name='confirmPassword'
                      type='password'
                      placeholder='Wpisz hasło ponownie'
                      className={styles.input}
                    />
                    <div className={styles.error}>
                      <ErrorMessage name='confirmPassword' component='span' />
                    </div>
                  </div>
                </div>

                {error && <p className={styles.submitError}>{error}</p>}

                <Button type='submit' className={styles.button}>
                  Utwórz konto
                </Button>
              </Form>
            </Formik>

            <div className={styles.switchAuth}>
              <span>Masz już konto? </span>
              <Link to='/login'>Zaloguj się</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
