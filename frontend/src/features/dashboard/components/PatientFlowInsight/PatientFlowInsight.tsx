import styles from './PatientFlowInsight.module.scss';
import { flowItems } from '../../data/stats.mock';

export default function PatientFlowInsight() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>ANALIZA TYGODNIA</p>
        <h2>Przepływ pacjentów</h2>
      </div>

      <div className={styles.trendBox}>
        <strong>+12%</strong>
        <span>Wzrost względem poprzedniego tygodnia</span>
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
