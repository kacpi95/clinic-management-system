import type { Appointment } from '../../appointments/types/appointment.type';

export function getCurrentMonthAppointments(appointments: Appointment[]) {
  const now = new Date();

  return appointments.filter((appointment) => {
    const date = new Date(appointment.startTime);

    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  });
}
