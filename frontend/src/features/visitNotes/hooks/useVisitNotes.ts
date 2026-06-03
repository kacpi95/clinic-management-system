import { useEffect, useState } from 'react';

import type { VisitNote } from '../types/visitNote.types';
import { getVisitNotes } from '../services/visitNote.api';

export function useVisitNotes() {
  const [visitNotes, setVisitNotes] = useState<VisitNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadVisitNotes() {
      setIsLoading(true);
      try {
        const data = await getVisitNotes();
        setVisitNotes(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        setError(`Failed to load visit notes: ${message}`);
      } finally {
        setIsLoading(false);
      }
    }

    loadVisitNotes();
  }, []);

  return { visitNotes, isLoading, error, setVisitNotes };
}
