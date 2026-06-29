import type { Appointment } from '../../appointments/types/appointment.type';
import type { VisitNote } from '../../visitNotes/types/visitNote.types';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  pesel: string;
  birthDate: string;
  phone: string;
  email: string | null;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientData {
  firstName: string;
  lastName: string;
  pesel: string;
  birthDate: string;
  phone: string;
  email?: string;
  address: string;
}

export type PatientsHeaderProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  patients: Patient[];
};

export type PatientsTableProps = {
  searchTerm: string;
};

export type UpdatePatientData = Partial<CreatePatientData>;

export interface PatientDetails extends Patient {
  appointments: Appointment[];
  visitNotes: VisitNote[];
}
