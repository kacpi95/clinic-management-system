import { useEffect, useState } from 'react';

import type { Appointment } from '../types/appointment.type';
import { getAppointments } from '../services/appointment.api';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAppointments() {
      setIsLoading(true);
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        setError(`Failed to load appointments: ${message}`);
      } finally {
        setIsLoading(false);
      }
    }
    loadAppointments();
  }, []);

  return { appointments, isLoading, error, setAppointments };
}
