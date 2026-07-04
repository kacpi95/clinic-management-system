export type AppointmentStatus = 'PLANNED' | 'COMPLETED' | 'CANCELED';

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;

  patient?: {
    id: number;
    firstName: string;
    lastName: string;
    pesel: string;
  };

  doctor?: {
    id: number;
    firstName: string;
    lastName: string;
    specialization: string;
  };
}

export interface CreateAppointmentData {
  patientId: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  reason: string;
  notes?: string;
  status: AppointmentStatus;
}

export type UpdateAppointmentData = Partial<CreateAppointmentData> & {
  status?: AppointmentStatus;
};
