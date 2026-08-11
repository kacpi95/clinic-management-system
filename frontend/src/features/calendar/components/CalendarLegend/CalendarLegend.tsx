import styles from './CalendarLegend.module.scss';
import { useCalendarAppointments } from '../../hooks/useCalendarAppointments';
import { getAppointmentStats } from '../../../appointments/utils/getAppointmentStats';

export default function CalendarLegend() {
  const { isLoading, error, calendarAppointments } = useCalendarAppointments();

  const stats = getAppointmentStats(calendarAppointments);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const filters = [
    {
      id: 1,
      name: 'Zaplanowane',
      number: stats.planned,
      variant: 'planned',
    },
    {
      id: 2,
      name: 'Zakończone',
      number: stats.completed,
      variant: 'completed',
    },
    {
      id: 3,
      name: 'Anulowane',
      number: stats.canceled,
      variant: 'canceled',
    },
  ];

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Statusy wizyt</h2>

      <div className={styles.filters}>
        {filters.map((filter) => (
          <div key={filter.id} className={styles.filterItem}>
            <div className={styles.left}>
              <span
                className={`${styles.colorCircle} ${styles[filter.variant]}`}
              />

              <span className={styles.filterName}>{filter.name}</span>
            </div>

            <span className={styles.filterNumber}>{filter.number}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
