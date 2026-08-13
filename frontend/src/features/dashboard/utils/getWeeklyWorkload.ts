import type { Appointment } from '../../appointments/types/appointment.type';

export function getWeeklyWorkload(appointments: Appointment[]) {
  const now = new Date();

  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const weekAppointments = appointments.filter((appointment) => {
    const date = new Date(appointment.startTime);

    return (
      date >= startOfWeek &&
      date < endOfWeek &&
      appointment.status !== 'CANCELED'
    );
  });

  const days = [
    { day: 1, label: 'Poniedziałek' },
    { day: 2, label: 'Wtorek' },
    { day: 3, label: 'Środa' },
    { day: 4, label: 'Czwartek' },
    { day: 5, label: 'Piątek' },
  ];

  return days.map((item) => ({
    label: item.label,
    value: weekAppointments.filter(
      (appointment) => new Date(appointment.startTime).getDay() === item.day,
    ).length,
  }));
}
