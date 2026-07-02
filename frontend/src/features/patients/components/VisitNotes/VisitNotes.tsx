import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

import type { VisitNote } from '../../../visitNotes/types/visitNote.types';
import styles from './VisitNotes.module.scss';
import { getNoteWord } from '../../utils/getNoteWord';

type Props = {
  visitNotes: VisitNote[];
};

export default function VisitNotes({ visitNotes }: Props) {
  const [openedId, setOpenedId] = useState<number | null>(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Notatki lekarza</h2>

        <span
          className={styles.counter}
        >{` ${visitNotes.length} ${getNoteWord(visitNotes.length)}`}</span>
      </div>

      {visitNotes.map((note) => (
        <article key={note.id} className={styles.card}>
          <header
            className={styles.header}
            onClick={() => setOpenedId(openedId === note.id ? null : note.id)}
          >
            <div className={styles.left}>
              <strong>{note.diagnosis}</strong>
              <span>Diagnoza z wizyty</span>
            </div>

            {openedId === note.id ? (
              <FaChevronDown className={styles.icon} />
            ) : (
              <FaChevronRight className={styles.icon} />
            )}
          </header>

          {openedId === note.id && (
            <div className={styles.content}>
              <div className={styles.box}>
                <strong>Diagnoza</strong>
                <p>{note.diagnosis}</p>
              </div>

              <div className={styles.box}>
                <strong>Zalecenia</strong>
                <p>{note.recommendations || 'Brak zaleceń.'}</p>
              </div>

              <div className={styles.box}>
                <strong>Leki</strong>
                <p>{note.medications || 'Brak przepisanych leków.'}</p>
              </div>

              <div className={styles.box}>
                <strong>Uwagi</strong>
                <p>{note.notes || 'Brak dodatkowych uwag.'}</p>
              </div>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
