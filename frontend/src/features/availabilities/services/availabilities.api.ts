import { apiClient } from '../../../utils/apiClient';
import type {
  Availability,
  CreateAvailabilityData,
  UpdateAvailabilityData,
} from '../types/availability.types';

export function getAvailabilities() {
  return apiClient<Availability[]>(`/availabilities`);
}

export function getAvailabilityById(id: number) {
  return apiClient<Availability>(`/availabilities/${id}`);
}

export function createAvailability(data: CreateAvailabilityData) {
  return apiClient<Availability>(`/availabilities`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateAvailability(id: number, data: UpdateAvailabilityData) {
  return apiClient<Availability>(`/availabilities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteAvailability(id: number) {
  return apiClient<{ message: string }>(`/availabilities/${id}`, {
    method: 'DELETE',
  });
}
