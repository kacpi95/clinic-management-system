import { apiClient } from '../../../utils/apiClient';
import type {
  CreateVisitNoteData,
  UpdateVisitNoteData,
} from '../types/visitNote.types';

export function getVisitNotes() {
  return apiClient('/visit-notes');
}

export function getVisitNoteById(id: number) {
  return apiClient(`/visit-notes/${id}`);
}

export function createVisitNote(data: CreateVisitNoteData) {
  return apiClient(`/visit-notes`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateVisitNote(id: number, data: UpdateVisitNoteData) {
  return apiClient(`/visit-notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteVisitNote(id: number) {
  return apiClient(`/visit-notes/${id}`, {
    method: 'DELETE',
  });
}
