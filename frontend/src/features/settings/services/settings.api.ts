import { apiClient } from '../../../utils/apiClient';
import type { UpdateDoctorProfileData } from '../types/settings.types';

export function updateDoctorProfile(data: UpdateDoctorProfileData) {
  return apiClient('/settings/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
