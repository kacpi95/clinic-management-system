import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '../../../../components/Button/Button';
import { usePatient } from '../../../patients/hooks/usePatient';
import styles from './NewAppointment.module.scss';
import { useAuth } from '../../../../context/useAuth';
import { APPOINTMENT_HOURS } from '../../appointmentHours';
import { createAppointment } from '../../services/appointment.api';
import type { AppointmentStatus } from '../../types/appointment.type';

export default function NewAppointment() {
  const { id } = useParams();
  const { user } = useAuth();

  const { patient, isLoading, error } = usePatient(Number(id));

  const initialValues = {
    patientId: patient?.id ?? 0,
    date: '',
    startTime: '',
    reason: '',
    notes: '',
  };

  const validationSchema = Yup.object({
    date: Yup.date()
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        'Nie można wybrać przeszłej daty',
      )
      .required('Data jest wymagana'),

    startTime: Yup.string().required('Godzina rozpoczęcia jest wymagana'),

    reason: Yup.string()
      .min(10, 'Minimum 10 znaków')
      .max(100, 'Maksymalnie 100 znaków')
      .required('Powód wizyty jest wymagany'),

    notes: Yup.string()
      .min(10, 'Minimum 10 znaków')
      .max(255, 'Maksymalnie 255 znaków'),
  });

  const onSubmit = async (values: typeof initialValues) => {
    const startTime = new Date(`${values.date}T${values.startTime}`);

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);

    const status: AppointmentStatus = 'PLANNED';

    if (!user?.doctor?.id) {
      return;
    }
    const doctorId = user?.doctor?.id;

    const newAppointment = {
      patientId: values.patientId,
      doctorId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      reason: values.reason,
      notes: values.notes,
      status,
    };

    try {
      console.log(newAppointment);
      await createAppointment(newAppointment);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Nie znaleziono pacjenta.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>NOWA WIZYTA</p>
        <h1 className={styles.title}>Umów wizytę</h1>
      </div>
      <div className={styles.infoGrid}>
        <div className={styles.card}>
          <span className={styles.label}>Pacjent</span>
          <h3>
            {patient.firstName} {patient.lastName}
          </h3>
          <p>PESEL: {patient.pesel}</p>
        </div>
        <div className={styles.card}>
          <span className={styles.label}>Lekarz prowadzący</span>
          <h3>
            {user?.doctor?.firstName} {user?.doctor?.lastName}
          </h3>
          <p>{user?.doctor?.specialization}</p>
        </div>
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
              <label>Data wizyty</label>

              <Field type='date' name='date' className={styles.input} />

              <ErrorMessage
                name='date'
                component='span'
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label>Godzina rozpoczęcia</label>

              <Field name='startTime' as='select' className={styles.input}>
                <option value=''>Wybierz godzinę</option>
                {APPOINTMENT_HOURS.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </Field>

              <ErrorMessage
                name='startTime'
                component='span'
                className={styles.error}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Powód wizyty</label>

            <Field
              as='textarea'
              name='reason'
              rows={4}
              className={styles.textarea}
            />

            <ErrorMessage
              name='reason'
              component='span'
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label>Dodatkowe uwagi</label>

            <Field
              as='textarea'
              name='notes'
              rows={5}
              className={styles.textarea}
            />

            <ErrorMessage
              name='notes'
              component='span'
              className={styles.error}
            />
          </div>

          <div className={styles.actions}>
            <Button type='submit'>Umów wizytę</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
