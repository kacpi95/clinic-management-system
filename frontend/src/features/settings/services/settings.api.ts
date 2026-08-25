import { apiClient } from '../../../utils/apiClient';
import type {
  UpdateDoctorProfileData,
  ChangePasswordData,
} from '../types/settings.types';

export function updateDoctorProfile(data: UpdateDoctorProfileData) {
  return apiClient('/settings/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function ChangePassword(data: ChangePasswordData) {
  return apiClient('/settings/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
