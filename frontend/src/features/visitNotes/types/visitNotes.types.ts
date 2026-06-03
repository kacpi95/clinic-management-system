export interface VisitNote {
  id: number;
  patientId: number;
  appointmentId: number;
  doctorId: number;
  diagnosis: string;
  recommendations?: string;
  medications?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVisitNoteData {
  patientId: number;
  appointmentId: number;
  doctorId: number;
  diagnosis: string;
  recommendations?: string;
  medications?: string;
  notes?: string;
}

export type UpdateVisitNoteData = Partial<CreateVisitNoteData>;
