import styles from './PatientFlowInsight.module.scss';
import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { getWeeklyAppointmentStats } from '../../utils/getWeeklyAppointmentStats';

export default function PatientFlowInsight() {
  const { calendarAppointments } = useCalendarAppointments();

  const stats = getWeeklyAppointmentStats(calendarAppointments);

  const flowItems = [
    {
      label: 'Wizyty w tym tygodniu',
      value: stats.total,
    },
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
        <p className={styles.eyebrow}>ANALIZA TYGODNIA</p>
        <h2>Przepływ pacjentów</h2>
      </div>

      <div className={styles.trendBox}>
        <strong>
          {stats.change === null
            ? '—'
            : `${stats.change > 0 ? '+' : ''}${stats.change}%`}
        </strong>

        <span>Względem poprzedniego tygodnia</span>
      </div>

      <ul className={styles.list}>
        {flowItems.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
