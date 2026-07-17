import { apiClient } from '../../../utils/apiClient';
import type { Appointment } from '../../appointments/types/appointment.type';

export function getCalendarAppointments() {
  return apiClient<Appointment[]>('/appointments/calendar');
}
