import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { getAppointmentStatusDistribution } from '../../utils/getAppointmentStatusDistribution';

import styles from './AppointmentStatusCard.module.scss';

export default function AppointmentStatusCard() {
  const { calendarAppointments } = useCalendarAppointments();

  const stats = getAppointmentStatusDistribution(calendarAppointments);

  const appointmentStatuses = [
    {
      label: 'Zakończone',
      value: stats.completed,
    },
    {
      label: 'Zaplanowane',
      value: stats.planned,
    },
    {
      label: 'Anulowane',
      value: stats.canceled,
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Status wizyt</h2>
        <p>Rozkład wizyt w bieżącym miesiącu</p>
      </div>
      <div
        className={styles.score}
        style={{
          background: `conic-gradient(
  var(--color-primary) ${stats.completed}%,
  var(--color-primary-soft) ${stats.completed}% 100%
)`,
        }}
      >
        <div className={styles.scoreInner}>
          <strong>{stats.completed}%</strong>
          <span>zakończonych</span>
        </div>
      </div>
      <ul className={styles.list}>
        {appointmentStatuses.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}%</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
