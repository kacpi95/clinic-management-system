import styles from './TodaysAppointments.module.scss';
import { appointments } from '../../data/stats.mock';

export default function TodaysAppointments() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Dzisiejsze wizyty</h2>

        <button className={styles.linkButton}>Zobacz wszystkie</button>
      </div>

      <ul className={styles.list}>
        {appointments.map((appointment) => (
          <li
            key={`${appointment.patient}-${appointment.time}`}
            className={styles.item}
          >
            <article className={styles.card}>
              <div className={styles.time}>
                <span>{appointment.time}</span>
              </div>

              <div className={styles.avatar}>
                <img src={appointment.photo} alt={appointment.patient} />
              </div>

              <div className={styles.content}>
                <h3>{appointment.patient}</h3>
                <p>{appointment.reason}</p>
              </div>

              <div className={styles.status}>{appointment.status}</div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
