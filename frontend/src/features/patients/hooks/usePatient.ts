import { useCallback, useEffect, useState } from 'react';

import { getPatientById } from '../services/patients.api';
import type { PatientDetails } from '../types/patient.types';

export function usePatient(id: number) {
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPatient = useCallback(async () => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await getPatientById(id);

      setPatient(data);
      setError('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      setError(`Failed to load patient: ${message}`);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPatient();
  }, [loadPatient]);

  return {
    patient,
    isLoading,
    error,
    reloadPatient: loadPatient,
  };
}
