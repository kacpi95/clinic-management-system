import CalendarLegend from '../../features/calendar/components/CalendarLegend/CalendarLegend';
import CalendarGrid from '../../features/calendar/components/CalendarGrid/CalendarGrid';
import CalendarHeader from '../../features/calendar/components/CalendarHeader/CalendarHeader';
import UpcomingAppointmentsCard from '../../features/calendar/components/UpcomingAppointmentsCard/UpcomingAppointmentsCard';
import styles from './Calendar.module.scss';

export default function Calendar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CalendarHeader />
      </div>
      <div className={styles.content}>
        <div className={styles.leftSidebar}>
          <CalendarLegend />
          <UpcomingAppointmentsCard />
        </div>
        <div className={styles.mainContent}>
          <CalendarGrid />
        </div>
      </div>
    </div>
  );
}
