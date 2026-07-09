import PatientForm from '../../components/PatientForm/PatientForm';
import styles from './NewPatient.module.scss';

export default function NewPatient() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nowy pacjent</h1>
      </div>

      <PatientForm />
    </div>
  );
}
