import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { getMonthlyAnalyticsStats } from '../../utils/getMonthlyAnalyticsStats';

import styles from './AnalyticsStats.module.scss';

export default function AnalyticsStats() {
  const { calendarAppointments } = useCalendarAppointments();

  const stats = getMonthlyAnalyticsStats(calendarAppointments);

  const analyticsStats = [
    {
      id: 1,
      label: 'Aktywni pacjenci',
      value: stats.patients,
    },
    {
      id: 2,
      label: 'Wizyty',
      value: stats.appointments,
    },
    {
      id: 3,
      label: 'Zakończone',
      value: stats.completed,
    },
    {
      id: 4,
      label: 'Anulowane',
      value: stats.canceled,
    },
  ];

  return (
    <section className={styles.wrapper}>
      {analyticsStats.map((stat) => (
        <article key={stat.id} className={styles.card}>
          <p>{stat.label}</p>
          <strong>{stat.value}</strong>
        </article>
      ))}
    </section>
  );
}
