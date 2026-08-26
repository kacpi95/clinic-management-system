import type { Appointment } from '../../appointments/types/appointment.type';

export function getUpcomingAppointments(
  appointments: Appointment[],
  limit = 4,
) {
  const now = new Date();

  return appointments
    .filter(
      (appointment) =>
        appointment.status === 'PLANNED' &&
        new Date(appointment.startTime) > now,
    )
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    )
    .slice(0, limit);
}
