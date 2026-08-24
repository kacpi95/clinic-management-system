
import { getAppointmentDisplayStatus } from '../../../utils/getAppointmentDisplayStatus';
import type { Appointment } from '../../appointments/types/appointment.type';
import { getCurrentMonthAppointments } from './getCurrentMonthAppointments';

export function getAppointmentStatusDistribution(appointments: Appointment[]) {
  const monthlyAppointments = getCurrentMonthAppointments(appointments);

  const total = monthlyAppointments.length;

  if (total === 0) {
    return {
      completed: 0,
      planned: 0,
      canceled: 0,
    };
  }

  const completed = monthlyAppointments.filter(
    (appointment) => getAppointmentDisplayStatus(appointment) === 'COMPLETED',
  ).length;

  const planned = monthlyAppointments.filter(
    (appointment) => getAppointmentDisplayStatus(appointment) === 'PLANNED',
  ).length;

  const canceled = monthlyAppointments.filter(
    (appointment) => getAppointmentDisplayStatus(appointment) === 'CANCELED',
  ).length;

  return {
    completed: Math.round((completed / total) * 100),
    planned: Math.round((planned / total) * 100),
    canceled: Math.round((canceled / total) * 100),
  };
}
