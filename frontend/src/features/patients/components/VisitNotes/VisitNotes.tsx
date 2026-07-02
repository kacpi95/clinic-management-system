import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

import type { VisitNote } from '../../../visitNotes/types/visitNote.types';
import styles from './VisitNotes.module.scss';

type Props = {
  visitNotes: VisitNote[];
};

export default function VisitNotes({ visitNotes }: Props) {
  const [openedId, setOpenedId] = useState<number | null>(null);

  return (
    <section className={styles.wrapper}>
      <h2>Notatki lekarza</h2>

      {visitNotes.map((note) => (
        <article key={note.id} className={styles.card}>
          <header
            className={styles.header}
            onClick={() => setOpenedId(openedId === note.id ? null : note.id)}
          >
            <strong>{note.diagnosis}</strong>

            {openedId === note.id ? <FaChevronDown /> : <FaChevronRight />}
          </header>

          {openedId === note.id && (
            <div className={styles.content}>
              <p>
                <strong>Zalecenia: </strong>
              </p>

              <p>
                <strong>Leki:</strong> {note.medications}
              </p>

              <p>
                <strong>Uwagi:</strong> {note.notes}
              </p>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
