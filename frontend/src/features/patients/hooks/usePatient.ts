import { useEffect, useState } from 'react';

import { getPatientById } from '../services/patients.api';
import type { PatientDetails } from '../types/patient.types';

export function usePatient(id: number) {
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPatient() {
      setIsLoading(true);

      try {
        const data = await getPatientById(id);
        console.log(data);
        setPatient(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';

        setError(`Failed to load patient: ${message}`);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadPatient();
    }
  }, [id]);

  return {
    patient,
    isLoading,
    error,
  };
}
