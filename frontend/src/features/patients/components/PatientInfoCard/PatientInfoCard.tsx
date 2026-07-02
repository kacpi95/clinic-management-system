import type { Patient } from '../../types/patient.types';
import styles from './PatientInfoCard.module.scss';

type Props = {
  patient: Patient;
};

export default function PatientInfoCard({ patient }: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>KARTA PACJENTA</p>

          <h2 className={styles.title}>
            {patient.firstName} {patient.lastName}
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.label}>PESEL</span>
          <span className={styles.value}>{patient.pesel}</span>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>Telefon</span>
          <span className={styles.value}>{patient.phone}</span>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{patient.email || 'Brak'}</span>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>Adres</span>
          <span className={styles.value}>{patient.address}</span>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>Data urodzenia</span>
          <span className={styles.value}>
            {new Date(patient.birthDate).toLocaleDateString('pl-PL')}
          </span>
        </div>
      </div>
    </section>
  );
}
