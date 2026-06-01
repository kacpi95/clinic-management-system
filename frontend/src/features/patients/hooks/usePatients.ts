import { useEffect, useState } from 'react';

import type { Patient } from '../types/patient.types';
import { getPatients } from '../services/patients.api';

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPatients() {
      setIsLoading(true);
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        setError(`Failed to load patients: ${message}`);
      } finally {
        setIsLoading(false);
      }
    }

    loadPatients();
  }, []);

  return { patients, isLoading, error, setPatients };
}
