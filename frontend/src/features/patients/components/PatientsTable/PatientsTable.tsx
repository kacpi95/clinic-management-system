import { BsThreeDots } from 'react-icons/bs';

import patientOne from '../../../../assets/patient-1.png';
import styles from './PatientsTable.module.scss';
import { usePatients } from '../../hooks/usePatients';

export default function PatientsTable() {
  const { patients, isLoading, error } = usePatients();

  if (isLoading) {
    return <div>Ładowanie danych</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div>Imię i nazwisko</div>
          <div>PESEL</div>
          <div>Email</div>
          <div>Telefon</div>
          <div>Akcje</div>
        </div>

        <div className={styles.body}>
          {patients.map((patient) => (
            <div key={patient.id} className={styles.row}>
              <div className={styles.patient}>
                <span
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${patientOne})` }}
                ></span>
                <strong>
                  {patient.firstName} {patient.lastName}
                </strong>
              </div>
              <div className={styles.cell}>{patient.pesel}</div>
              <div className={styles.cell}>{patient.email}</div>
              <div className={styles.cell}>{patient.phone}</div>

              <div className={styles.actions}>
                <button className={styles.actionButton}>
                  <BsThreeDots />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
