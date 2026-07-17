import { useEffect, useState } from 'react';
import type { Appointment } from '../../appointments/types/appointment.type';
import { getCalendarAppointments } from '../services/calendar.api';

export function useCalendarAppointments() {
  const [calendarAppointments, setCalendarAppointments] = useState<
    Appointment[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCalendarAppointments() {
      setIsLoading(true);

      try {
        const data = await getCalendarAppointments();
        setCalendarAppointments(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        setError(`Failed to load calendar appointments: ${message}`);
      } finally {
        setIsLoading(false);
      }
    }
    loadCalendarAppointments();
  }, []);

  return { calendarAppointments, isLoading, error };
}
