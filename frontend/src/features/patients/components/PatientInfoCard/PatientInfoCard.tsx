import type { Patient } from '../../types/patient.types';
import styles from './PatientInfoCard.module.scss';

type Props = {
  patient: Patient;
};

export default function PatientInfoCard({ patient }: Props) {
  return (
    <section className={styles.wrapper}>
      <h2>Dane pacjenta</h2>
      <div className={styles.grid}>
        <p>
          <strong>Imię i nazwisko</strong>
          <span>
            {patient.firstName} {patient.lastName}
          </span>
        </p>
        <p>
          <strong>PESEL</strong>
          <span>{patient.pesel}</span>
        </p>
        <p>
          <strong>Telefon</strong>
          <span>{patient.phone}</span>
        </p>
        <p>
          <strong>Email</strong>
          <span>{patient.email}</span>
        </p>
        <p>
          <strong>Adres</strong>
          <span>{patient.address}</span>
        </p>
      </div>
    </section>
  );
}
