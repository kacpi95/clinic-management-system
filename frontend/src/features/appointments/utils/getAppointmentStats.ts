import type { Appointment } from '../types/appointment.type';

export function getAppointmentStats(appointments: Appointment[]) {
  return appointments.reduce(
    (stats, appointment) => {
      switch (appointment.status) {
        case 'PLANNED':
          stats.planned += 1;
          break;
        case 'COMPLETED':
          stats.completed += 1;
          break;
        case 'CANCELED':
          stats.canceled += 1;
          break;
      }

      return stats;
    },
    {
      planned: 0,
      completed: 0,
      canceled: 0,
    },
  );
}
