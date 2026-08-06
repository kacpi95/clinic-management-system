import { useState } from 'react';

import CalendarLegend from '../../features/calendar/components/CalendarLegend/CalendarLegend';
import CalendarGrid from '../../features/calendar/components/CalendarGrid/CalendarGrid';
import CalendarHeader from '../../features/calendar/components/CalendarHeader/CalendarHeader';
import UpcomingAppointmentsCard from '../../features/calendar/components/UpcomingAppointmentsCard/UpcomingAppointmentsCard';

import styles from './Calendar.module.scss';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CalendarHeader
          currentDate={currentDate}
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.leftSidebar}>
          <CalendarLegend />
          <UpcomingAppointmentsCard />
        </div>

        <div className={styles.mainContent}>
          <CalendarGrid currentDate={currentDate} />
        </div>
      </div>
    </div>
  );
}
