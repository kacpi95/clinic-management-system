import { useParams } from 'react-router-dom';

import { usePatient } from '../../../patients/hooks/usePatient';
import styles from './NewAppointment.module.scss';
import { useAuth } from '../../../../context/useAuth';

export default function NewAppointment() {
  const { id } = useParams();
  const { user } = useAuth();

  const { patient, isLoading, error } = usePatient(Number(id));

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
    </div>
  );
}
