import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl';

import styles from './CalendarGrid.module.scss';
import { useCalendarAppointments } from '../../hooks/useCalendarAppointments';
import { mapAppointmentsToEvents } from '../../utils/mapAppointmentsToEvents';

export default function CalendarGrid() {
  const { calendarAppointments } = useCalendarAppointments();

  const events = mapAppointmentsToEvents(calendarAppointments);

  return (
    <section className={styles.wrapper}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={plLocale}
        initialView='dayGridMonth'
        height='auto'
        events={events}
        headerToolbar={false}
        fixedWeekCount={false}
        dayMaxEvents={2}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
      />
    </section>
  );
}
