
import type { Appointment } from '../../appointments/types/appointment.type';
import { getCurrentMonthAppointments } from './getCurrentMonthAppointments';

export function getMonthlyVisitsChart(appointments: Appointment[]) {
  const monthlyAppointments = getCurrentMonthAppointments(appointments);

  const weeks = [0, 0, 0, 0, 0];

  monthlyAppointments.forEach((appointment) => {
    const day = new Date(appointment.startTime).getDate();

    const weekIndex = Math.floor((day - 1) / 7);

    weeks[weekIndex]++;
  });

  return weeks.map((visits, index) => ({
    label: `Tydz. ${index + 1}`,
    visits,
  }));
}
