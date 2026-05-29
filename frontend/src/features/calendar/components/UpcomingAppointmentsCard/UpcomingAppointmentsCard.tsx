import { appointments } from '../../data/calendar.mock';
import styles from './UpcomingAppointmentsCard.module.scss';

export default function UpcomingAppointmentsCard() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Nadchodzące wizyty</h2>
      <div className={styles.list}>
        {appointments.map((appointment) => (
          <div key={appointment.id} className={styles.item}>
            <div className={styles.time}>{appointment.time}</div>
            <div className={styles.content}>
              <strong>{appointment.patient}</strong>
              <span>{appointment.type}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
