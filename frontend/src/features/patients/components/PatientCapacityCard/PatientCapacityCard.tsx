import styles from './PatientCapacityCard.module.scss';

const clinicCapacity = {
  occupied: 78,
  activePatients: 24,
  availableSlots: 12,
  doctorsOnDuty: 3,
};

export default function PatientCapacityCard() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Podgląd</p>

        <h2 className={styles.title}>Pojemność kliniki</h2>
      </div>

      <div className={styles.capacity}>
        <strong>{clinicCapacity.occupied}%</strong>

        <span>Dzisiejsze obłożenie</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{
            width: `${clinicCapacity.occupied}%`,
          }}
        />
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span>Aktywni pacjenci</span>
          <strong>{clinicCapacity.activePatients}</strong>
        </div>

        <div className={styles.stat}>
          <span>Wolne terminy</span>
          <strong>{clinicCapacity.availableSlots}</strong>
        </div>

        <div className={styles.stat}>
          <span>Lekarze na dyżurze</span>
          <strong>{clinicCapacity.doctorsOnDuty}</strong>
        </div>
      </div>
    </section>
  );
}
