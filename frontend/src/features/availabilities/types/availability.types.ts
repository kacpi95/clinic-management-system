export interface Availability {
  id: number;
  doctorId: number;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAvailabilityData {
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export type UpdateAvailabilityData = Partial<CreateAvailabilityData>;
