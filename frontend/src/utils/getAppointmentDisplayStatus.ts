import type {
  Appointment,
  AppointmentStatus,
} from '../features/appointments/types/appointment.type';

export function getAppointmentDisplayStatus(
  appointment: Appointment,
): AppointmentStatus {
  if (
    appointment.status === 'PLANNED' &&
    new Date(appointment.endTime) < new Date()
  ) {
    return 'COMPLETED';
  }

  return appointment.status;
}
