import { useParams } from 'react-router-dom';

import Button from '../../../../components/Button/Button';
import { usePatient } from '../../hooks/usePatient';
import styles from './PatientDetails.module.scss';
import PatientInfoCard from '../PatientInfoCard/PatientInfoCard';
import AppointmentHistory from '../AppointmentHistory/AppointmentHistory';
import VisitNotes from '../VisitNotes/VisitNotes';

export default function PatientDetails() {
  const { id } = useParams();

  const { patient, isLoading, error } = usePatient(Number(id));

  if (isLoading) {
    return <div>Ładowanie danych...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Nie znaleziono pacjenta.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <PatientInfoCard patient={patient} />

      <AppointmentHistory appointments={patient.appointments} />

      <VisitNotes visitNotes={patient.visitNotes} />
      <Button type='button' className={styles.button}>
        Umów wizytę
      </Button>
    </div>
  );
}
