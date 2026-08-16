import { getAppointmentDisplayStatus } from '../../../utils/getAppointmentDisplayStatus';
import type { Appointment } from '../../appointments/types/appointment.type';
import { getCurrentMonthAppointments } from './getCurrentMonthAppointments';

export function getMonthlyAnalyticsStats(appointments: Appointment[]) {
  const currentMonthAppointments = getCurrentMonthAppointments(appointments);

  const patientIds = new Set(
    currentMonthAppointments.map((appointment) => appointment.patientId),
  );

  const completed = currentMonthAppointments.filter(
    (appointment) => getAppointmentDisplayStatus(appointment) === 'COMPLETED',
  ).length;

  const canceled = currentMonthAppointments.filter(
    (appointment) => getAppointmentDisplayStatus(appointment) === 'CANCELED',
  ).length;

  return {
    patients: patientIds.size,
    appointments: currentMonthAppointments.length,
    completed,
    canceled,
  };
}
