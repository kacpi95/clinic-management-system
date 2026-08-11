import type { Appointment } from '../../appointments/types/appointment.type';

export function getTomorrowAppointments(appointments: Appointment[]) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.startTime);

    return (
      appointment.status === 'PLANNED' &&
      appointmentDate.getFullYear() === tomorrow.getFullYear() &&
      appointmentDate.getMonth() === tomorrow.getMonth() &&
      appointmentDate.getDate() === tomorrow.getDate()
    );
  });
}
