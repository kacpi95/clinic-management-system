import { useParams } from 'react-router-dom';
import PatientForm from '../../components/PatientForm/PatientForm';
import { usePatient } from '../../hooks/usePatient';
import styles from './EditPatient.module.scss';

export default function EditPatient() {
  const { id } = useParams();
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
        <h1 className={styles.title}>Edycja pacjenta</h1>
      </div>

      <PatientForm patient={patient} />
    </div>
  );
}
