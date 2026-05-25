import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import styles from './CalendarGrid.module.scss';
import { events } from '../../data/calendar.mock';

export default function CalendarGrid() {
  return (
    <section className={styles.wrapper}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        height='auto'
        events={events}
        headerToolbar={false}
        fixedWeekCount={false}
        dayMaxEvents={2}
      />
    </section>
  );
}
