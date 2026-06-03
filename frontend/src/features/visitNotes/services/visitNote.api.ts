import { apiClient } from '../../../utils/apiClient';
import type {
  CreateVisitNoteData,
  UpdateVisitNoteData,
  VisitNote,
} from '../types/visitNote.types';

export function getVisitNotes() {
  return apiClient<VisitNote[]>('/visit-notes');
}

export function getVisitNoteById(id: number) {
  return apiClient<VisitNote[]>(`/visit-notes/${id}`);
}

export function createVisitNote(data: CreateVisitNoteData) {
  return apiClient<VisitNote[]>(`/visit-notes`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateVisitNote(id: number, data: UpdateVisitNoteData) {
  return apiClient<VisitNote[]>(`/visit-notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteVisitNote(id: number) {
  return apiClient<{ message: string }>(`/visit-notes/${id}`, {
    method: 'DELETE',
  });
}
