import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { getMonthlyVisitsChart } from '../../utils/getMonthlyVisitsChart';

import styles from './VisitsChart.module.scss';

export default function VisitsChart() {
  const { calendarAppointments } = useCalendarAppointments();

  const visitsChartData = getMonthlyVisitsChart(calendarAppointments);

  const maxVisits = Math.max(...visitsChartData.map((item) => item.visits), 1);

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Liczba wizyt</h2>
        <p>Aktywność w bieżącym miesiącu</p>
      </div>
      <div className={styles.chart}>
        {visitsChartData.map((item) => (
          <div key={item.label} className={styles.barItem}>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  height: `${(item.visits / maxVisits) * 100}%`,
                }}
              />
            </div>
            <strong>{item.visits}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
