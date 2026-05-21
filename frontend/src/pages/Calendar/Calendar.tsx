import CalendarFilters from '../../features/calendar/components/CalendarFilters/CalendarFilters';
import CalendarHeader from '../../features/calendar/components/CalendarHeader/CalendarHeader';
import styles from './Calendar.module.scss';

export default function Calendar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CalendarHeader />
      </div>
      <div className={styles.content}>
        <div className={styles.leftSidebar}>
          <CalendarFilters />
          {/* OnCallCard */}
        </div>
        <div className={styles.mainContent}>{/* CalendarGrid */}</div>
      </div>
    </div>
  );
}
