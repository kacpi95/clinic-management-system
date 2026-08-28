import type {
  Appointment,
  CreateAppointmentData,
  UpdateAppointmentData,
} from '../types/appointment.type';
import { apiClient } from '../../../utils/apiClient';

export function getAppointments() {
  return apiClient<Appointment[]>(`/appointments`);
}

export function getAppointmentById(id: number) {
  return apiClient<Appointment>(`/appointments/${id}`);
}

export function createAppointment(data: CreateAppointmentData) {
  return apiClient<Appointment>(`/appointments`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateAppointment(id: number, data: UpdateAppointmentData) {
  return apiClient<Appointment>(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function cancelAppointment(id: number) {
  return apiClient(`/appointments/${id}/cancel`, {
    method: 'PATCH',
  });
}
