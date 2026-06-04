import { useEffect, useState } from 'react';
import type { Availability } from '../types/availability.types';
import { getAvailabilities } from '../services/availabilities.api';

export function useAvailabilities() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAvailabilities() {
      setIsLoading(true);

      try {
        const data = await getAvailabilities();
        setAvailabilities(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        setError(`Failed to load availabilities: ${message}`);
      } finally {
        setIsLoading(false);
      }
    }
    loadAvailabilities();
  }, []);

  return { availabilities, isLoading, error, setAvailabilities };
}
