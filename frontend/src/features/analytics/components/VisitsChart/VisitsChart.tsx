import { visitsChartData } from '../../data/analytics.mock';
import styles from './VisitsChart.module.scss';

export default function VisitsChart() {
  const maxVisits = Math.max(...visitsChartData.map((item) => item.visits));

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Liczba wizyt</h2>
        <p>Aktywność w ostatnich 7 dniach</p>
      </div>

      <div className={styles.chart}>
        {visitsChartData.map((item) => (
          <div key={item.day} className={styles.barItem}>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  height: `${(item.visits / maxVisits) * 100}%`,
                }}
              />
            </div>

            <span>{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
