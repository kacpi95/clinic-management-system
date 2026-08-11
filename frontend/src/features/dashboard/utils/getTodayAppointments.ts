import type { Appointment } from '../../appointments/types/appointment.type';

export function getTodayAppointments(appointments: Appointment[]) {
  const today = new Date();

  return appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.startTime);

    return (
      appointmentDate.getFullYear() === today.getFullYear() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getDate() === today.getDate()
    );
  });
}
