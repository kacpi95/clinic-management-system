import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

import Button from '../../../../components/Button/Button';
import { usePatient } from '../../hooks/usePatient';
import { createPatient, updatePatient } from '../../services/patients.api';
import styles from './PatientForm.module.scss';
import type { PatientDetails } from '../../types/patient.types';
import LoadingState from '../../../../components/Feedback/LoadingState';
import ErrorState from '../../../../components/Feedback/ErrorState';

type Props = {
  patient?: PatientDetails;
};

export default function PatientForm({ patient }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const { isLoading, error } = usePatient(Number(id));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: patient?.firstName ?? '',
    lastName: patient?.lastName ?? '',
    pesel: patient?.pesel ?? '',
    birthDate: patient?.birthDate ? patient.birthDate.slice(0, 10) : '',
    phone: patient?.phone ?? '',
    email: patient?.email ?? '',
    address: patient?.address ?? '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, 'Minimum 3 znaki')
      .max(20, 'Maksymalnie 20 znaków')
      .required('Imię jest wymagane'),

    lastName: Yup.string()
      .min(3, 'Minimum 3 znaki')
      .max(30, 'Maksymalnie 30 znaków')
      .required('Nazwisko jest wymagane'),

    pesel: Yup.string()
      .length(11, 'PESEL musi mieć 11 cyfr')
      .required('PESEL jest wymagany'),

    birthDate: Yup.date().required('Data urodzenia jest wymagana'),

    phone: Yup.string()
      .min(9, 'Numer jest za krótki')
      .max(15, 'Numer jest za długi')
      .required('Telefon jest wymagany'),

    email: Yup.string()
      .email('Niepoprawny adres email')
      .required('Email jest wymagany'),

    address: Yup.string()
      .min(5, 'Adres jest za krótki')
      .required('Adres jest wymagany'),
  });

  const onSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);

    try {
      if (isEditMode && patient) {
        await updatePatient(patient.id, values);

        toast.success('Pacjent został zaktualizowany');
      } else {
        await createPatient(values);

        toast.success('Pacjent został dodany');
      }

      navigate('/dashboard/patients');
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditMode && isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            {isEditMode ? 'EDYCJA PACJENTA' : 'NOWY PACJENT'}
          </p>

          <h2 className={styles.title}>
            {isEditMode ? 'Edytuj pacjenta' : 'Dodaj pacjenta'}
          </h2>
        </div>

        <Button
          type='button'
          className={styles.secondaryButton}
          onClick={() => navigate('/dashboard/patients')}
        >
          <FaArrowLeft />
          Powrót
        </Button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Imię</label>

              <Field type='text' name='firstName' className={styles.input} />

              <ErrorMessage
                name='firstName'
                component='span'
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label>Nazwisko</label>

              <Field type='text' name='lastName' className={styles.input} />

              <ErrorMessage
                name='lastName'
                component='span'
                className={styles.error}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>PESEL</label>

              <Field type='text' name='pesel' className={styles.input} />

              <ErrorMessage
                name='pesel'
                component='span'
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label>Data urodzenia</label>

              <Field type='date' name='birthDate' className={styles.input} />

              <ErrorMessage
                name='birthDate'
                component='span'
                className={styles.error}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Telefon</label>

              <Field type='text' name='phone' className={styles.input} />

              <ErrorMessage
                name='phone'
                component='span'
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label>Email</label>

              <Field type='email' name='email' className={styles.input} />

              <ErrorMessage
                name='email'
                component='span'
                className={styles.error}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Adres</label>

            <Field type='text' name='address' className={styles.input} />

            <ErrorMessage
              name='address'
              component='span'
              className={styles.error}
            />
          </div>

          <div className={styles.actions}>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting
                ? 'Zapisywanie...'
                : isEditMode
                  ? 'Zapisz zmiany'
                  : 'Dodaj pacjenta'}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
