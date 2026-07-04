import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import Button from '../../../../components/Button/Button';
import { usePatient } from '../../hooks/usePatient';
import AppointmentHistory from '../AppointmentHistory/AppointmentHistory';
import PatientInfoCard from '../PatientInfoCard/PatientInfoCard';
import VisitNotes from '../VisitNotes/VisitNotes';
import styles from './PatientDetails.module.scss';

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>KARTA PACJENTA</p>

          <h1 className={styles.title}>
            {patient.firstName} {patient.lastName}
          </h1>
        </div>
        <div className={styles.actions}>
          <Button
            type='button'
            className={styles.secondaryButton}
            onClick={() => navigate('/dashboard/patients')}
          >
            <FaArrowLeft />
            Powrót
          </Button>
          <Button
            type='button'
            className={styles.primaryButton}
            onClick={() =>
              navigate(`/dashboard/appointments/${id}/new-appointment`)
            }
          >
            Umów wizytę
          </Button>
        </div>
      </div>

      <PatientInfoCard patient={patient} />

      <AppointmentHistory appointments={patient.appointments} />

      <VisitNotes visitNotes={patient.visitNotes} />
    </div>
  );
}
