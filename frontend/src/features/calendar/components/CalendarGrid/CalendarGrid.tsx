import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl';
import type { EventClickArg } from '@fullcalendar/core';

import styles from './CalendarGrid.module.scss';
import { useCalendarAppointments } from '../../hooks/useCalendarAppointments';
import type { CalendarGridProps } from '../../types/calendarHeader.types';
import { getAppointmentDisplayStatus } from '../../../../utils/getAppointmentDisplayStatus';

export default function CalendarGrid({ currentDate }: CalendarGridProps) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const navigate = useNavigate();

  const { calendarAppointments } = useCalendarAppointments();

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();

    if (!calendarApi) return;

    calendarApi.gotoDate(currentDate);
  }, [currentDate]);

  const events = calendarAppointments.map((appointment) => {
    const status = getAppointmentDisplayStatus(appointment);

    return {
      id: appointment.id.toString(),
      title: `${appointment.patient?.firstName} ${appointment.patient?.lastName}`,
      start: appointment.startTime,
      end: appointment.endTime,

      classNames: [`appointment-${status.toLowerCase()}`],

      extendedProps: {
        patientId: appointment.patientId,
        status,
        reason: appointment.reason,
      },
    };
  });

  const handleEventClick = (info: EventClickArg) => {
    const patientId = info.event.extendedProps.patientId;

    navigate(`/dashboard/patients/${patientId}`);
  };

  return (
    <section className={styles.wrapper}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={plLocale}
        initialView='dayGridMonth'
        initialDate={currentDate}
        height='auto'
        events={events}
        headerToolbar={false}
        fixedWeekCount={false}
        dayMaxEvents={2}
        eventClick={handleEventClick}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
      />
    </section>
  );
}
