import { analyticsStats } from '../../data/analytics.mock';
import styles from './AnalyticsStats.module.scss';

export default function AnalyticsStats() {
  return (
    <section className={styles.wrapper}>
      {analyticsStats.map((stat) => (
        <article key={stat.id} className={styles.card}>
          <span className={styles.trend}>{stat.trend}</span>
          <p>{stat.label}</p>
          <strong>{stat.value}</strong>
        </article>
      ))}
    </section>
  );
}
