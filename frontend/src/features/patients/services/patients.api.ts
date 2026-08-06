import { apiClient } from '../../../utils/apiClient';

import type {
  Patient,
  CreatePatientData,
  UpdatePatientData,
  PatientDetails,
} from '../types/patient.types';

export function getPatients() {
  return apiClient<Patient[]>('/patients?_limit=100');
}

export function getPatientById(id: number) {
  return apiClient<PatientDetails>(`/patients/${id}`);
}

export function createPatient(data: CreatePatientData) {
  return apiClient<Patient>(`/patients`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updatePatient(id: number, data: UpdatePatientData) {
  return apiClient<Patient>(`/patients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deletePatient(id: number) {
  return apiClient<{ message: string }>(`/patients/${id}`, {
    method: 'DELETE',
  });
}
