import { getAppointmentDisplayStatus } from "../../../utils/getAppointmentDisplayStatus";
import type { Appointment } from "../../appointments/types/appointment.type";


export function getWeeklyAppointmentStats(appointments: Appointment[]) {
  const now = new Date();

  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const startOfPreviousWeek = new Date(startOfWeek);
  startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);

  const currentWeek = appointments.filter((appointment) => {
    const date = new Date(appointment.startTime);

    return date >= startOfWeek && date < endOfWeek;
  });

  const previousWeek = appointments.filter((appointment) => {
    const date = new Date(appointment.startTime);

    return date >= startOfPreviousWeek && date < startOfWeek;
  });

  const completed = currentWeek.filter(
    (appointment) => getAppointmentDisplayStatus(appointment) === 'COMPLETED',
  ).length;

  const planned = currentWeek.filter(
    (appointment) => getAppointmentDisplayStatus(appointment) === 'PLANNED',
  ).length;

  const canceled = currentWeek.filter(
    (appointment) => getAppointmentDisplayStatus(appointment) === 'CANCELED',
  ).length;

  const change =
    previousWeek.length === 0
      ? null
      : Math.round(
          ((currentWeek.length - previousWeek.length) / previousWeek.length) *
            100,
        );

  return {
    total: currentWeek.length,
    completed,
    planned,
    canceled,
    change,
  };
}
