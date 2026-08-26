import { usePatients } from '../../hooks/usePatients';
import styles from './PatientCapacityCard.module.scss';

const MAX_PATIENTS = 50;

export default function PatientCapacityCard() {
  const { isLoading, error, patients } = usePatients();

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const activePatients = patients.length;
  const occupied = Math.round((activePatients / MAX_PATIENTS) * 100);
  const availableSlots = MAX_PATIENTS - activePatients;

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>PODGLĄD</p>
        <h2 className={styles.title}>Przegląd praktyki</h2>
      </div>

      <div className={styles.capacity}>
        <strong>{occupied}%</strong>
        <span>Wykorzystanie limitu pacjentów</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{
            width: `${occupied}%`,
          }}
        />
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span>Aktywni pacjenci</span>
          <strong>{activePatients}</strong>
        </div>

        <div className={styles.stat}>
          <span>Wolne miejsca</span>
          <strong>{availableSlots}</strong>
        </div>

        <div className={styles.stat}>
          <span>Limit pacjentów</span>
          <strong>{MAX_PATIENTS}</strong>
        </div>
      </div>
    </section>
  );
}
