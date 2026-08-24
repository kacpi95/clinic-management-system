import type { Appointment } from '../../appointments/types/appointment.type';
import { getCurrentMonthAppointments } from './getCurrentMonthAppointments';

export function getVisitReasonsStats(appointments: Appointment[]) {
  const monthlyAppointments = getCurrentMonthAppointments(appointments);

  const counts = monthlyAppointments.reduce<Record<string, number>>(
    (acc, appointment) => {
      acc[appointment.reason] = (acc[appointment.reason] || 0) + 1;

      return acc;
    },
    {},
  );

  const total = monthlyAppointments.length;

  return Object.entries(counts)
    .map(([reason, count]) => ({
      reason,
      count,
      percentage: total === 0 ? 0 : Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}
