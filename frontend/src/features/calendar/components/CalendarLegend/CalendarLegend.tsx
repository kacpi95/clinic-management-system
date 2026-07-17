import styles from './CalendarLegend.module.scss';
import { useCalendarAppointments } from '../../hooks/useCalendarAppointments';

export default function CalendarLegend() {
  const { isLoading, error, calendarAppointments } = useCalendarAppointments();

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const plannedCount = calendarAppointments.filter(
    (appointment) => appointment.status === 'PLANNED',
  ).length;

  const completedCount = calendarAppointments.filter(
    (appointment) => appointment.status === 'COMPLETED',
  ).length;

  const canceledCount = calendarAppointments.filter(
    (appointment) => appointment.status === 'CANCELED',
  ).length;

  const filters = [
    {
      id: 1,
      name: 'Zaplanowane',
      number: plannedCount,
      variant: 'planned',
    },
    {
      id: 2,
      name: 'Zakończone',
      number: completedCount,
      variant: 'completed',
    },
    {
      id: 3,
      name: 'Anulowane',
      number: canceledCount,
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
