import { BsThreeDots } from 'react-icons/bs';

import styles from './PatientsTable.module.scss';
import { patients } from '../../data/patients.mock';

export default function PatientsTable() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div>Imię i nazwisko</div>
          <div>Specjalizacja lekarza</div>
          <div>PESEL</div>
          <div>Wiek</div>
          <div>Ostatnia wizyta</div>
          <div>Status</div>
          <div>Akcje</div>
        </div>

        <div className={styles.body}>
          {patients.map((patient) => (
            <div key={patient.id} className={styles.row}>
              <div className={styles.patient}>
                <span className={styles.avatar}>{patient.initials}</span>
                <strong>{patient.name}</strong>
              </div>

              <div className={styles.cell}>{patient.doctorSpecialization}</div>
              <div className={styles.cell}>{patient.pesel}</div>
              <div className={styles.cell}>{patient.wiek}</div>
              <div className={styles.cell}>{patient.ostatniaWizyta}</div>

              <div>
                <span className={styles.statusBadge}>{patient.status}</span>
              </div>

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
