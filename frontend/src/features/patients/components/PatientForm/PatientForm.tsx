import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from './PatientForm.module.scss';
import type { PatientDetails } from '../../types/patient.types';

type Props = {
  patient?: PatientDetails;
};

export default function PatientForm({ patient }: Props) {
  const { id } = useParams();

  const isEditMode = Boolean(id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>
          {isEditMode ? 'EDYCJA PACJENTA' : 'NOWY PACJENT'}
        </p>

        <h1 className={styles.title}>
          {isEditMode ? 'Edytuj pacjenta' : 'Dodaj pacjenta'}
        </h1>
      </div>

      <Formik
        initialValues={}
        validationSchema={}
        enableReinitialize
        onSubmit={}
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
        </Form>
      </Formik>
    </div>
  );
}
