import { appointmentStatuses } from '../../data/analytics.mock';
import styles from './AppointmentStatusCard.module.scss';

export default function AppointmentStatusCard() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Status wizyt</h2>
        <p>Rozkład wyników wizyt</p>
      </div>

      <div className={styles.score}>
        <strong>92%</strong>
        <span>zrealizowanych</span>
      </div>

      <ul className={styles.list}>
        {appointmentStatuses.map(item => (
          <li key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}%</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}