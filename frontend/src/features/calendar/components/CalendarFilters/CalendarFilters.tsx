import styles from './CalendarFilters.module.scss';
import { filters } from '../../data/calendar.mock';

export default function CalendarFilters() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Szybkie filtry</h2>

      <div className={styles.filters}>
        {filters.map((filter) => (
          <button key={filter.id} className={styles.filterItem}>
            <div className={styles.left}>
              <span
                className={`${styles.colorCircle} ${styles[filter.variant]}`}
              />

              <span className={styles.filterName}>{filter.name}</span>
            </div>

            <span className={styles.filterNumber}>{filter.number}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
