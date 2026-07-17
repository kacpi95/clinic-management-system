import type { Appointment } from '../../appointments/types/appointment.type';

export function mapAppointmentsToEvents(appointments: Appointment[]) {
  return appointments.map((appointment) => ({
    id: appointment.id.toString(),
    title: `${appointment.patient?.firstName} ${appointment.patient?.lastName}`,
    start: appointment.startTime,
    end: appointment.endTime,

    backgroundColor:
      appointment.status === 'PLANNED'
        ? '#0056b3'
        : appointment.status === 'COMPLETED'
          ? '#566075'
          : '#dc2626',

    borderColor:
      appointment.status === 'PLANNED'
        ? '#0056b3'
        : appointment.status === 'COMPLETED'
          ? '#566075'
          : '#dc2626',

    extendedProps: {
      status: appointment.status,
      patientId: appointment.patientId,
      reason: appointment.reason,
    },
  }));
}
