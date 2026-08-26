import styles from './WeeklyWorkload.module.scss';
import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { getWeeklyWorkload } from '../../utils/getWeeklyWorkload';

export default function WeeklyWorkload() {
  const { calendarAppointments, isLoading, error } = useCalendarAppointments();

  const workload = getWeeklyWorkload(calendarAppointments);

  const maxValue = Math.max(...workload.map((item) => item.value), 1);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>OBCIĄŻENIE</p>
          <h2>Ten tydzień</h2>
        </div>
      </div>
      <ul className={styles.list}>
        {workload.map((item) => (
          <li key={item.label} className={styles.item}>
            <div className={styles.itemHeader}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
