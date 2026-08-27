import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import Button from '../../../../components/Button/Button';
import { usePatient } from '../../hooks/usePatient';
import AppointmentHistory from '../AppointmentHistory/AppointmentHistory';
import PatientInfoCard from '../PatientInfoCard/PatientInfoCard';
import VisitNotes from '../VisitNotes/VisitNotes';
import styles from './PatientDetails.module.scss';
import { useState } from 'react';
import LoadingState from '../../../../components/Feedback/LoadingState';
import ErrorState from '../../../../components/Feedback/ErrorState';

export default function PatientDetails() {
  const [appointmentsPage, setAppointmentsPage] = useState(1);
  const [notesPage, setNotesPage] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();

  const { patient, isLoading, error, reloadPatient } = usePatient(Number(id));

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
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

      <AppointmentHistory
        appointments={patient.appointments}
        onAppointmentDeleted={reloadPatient}
        page={appointmentsPage}
        setPage={setAppointmentsPage}
      />

      <VisitNotes
        visitNotes={patient.visitNotes}
        page={notesPage}
        setPage={setNotesPage}
      />
    </div>
  );
}
