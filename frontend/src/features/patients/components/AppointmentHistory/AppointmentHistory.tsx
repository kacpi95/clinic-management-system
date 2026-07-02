import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

import type { Appointment } from '../../../appointments/types/appointment.type';
import styles from './AppointmentHistory.module.scss';
import { getVisitWord } from '../../utils/getVisitWord';

type Props = {
  appointments: Appointment[];
};

const statusLabels = {
  PLANNED: 'Zaplanowana',
  COMPLETED: 'Zakończona',
  CANCELED: 'Anulowana',
};

export default function AppointmentHistory({ appointments }: Props) {
  const [openedId, setOpenedId] = useState<number | null>(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Historia wizyt</h2>

        <span
          className={styles.counter}
        >{`${appointments.length} ${getVisitWord(appointments.length)}`}</span>
      </div>

      {appointments.map((appointment) => (
        <article key={appointment.id} className={styles.card}>
          <header
            className={styles.header}
            onClick={() =>
              setOpenedId(openedId === appointment.id ? null : appointment.id)
            }
          >
            <div className={styles.left}>
              <strong>{appointment.reason}</strong>

              <span>
                {new Date(appointment.startTime).toLocaleDateString('pl-PL')}
              </span>
            </div>

            <div className={styles.right}>
              <span
                className={`${styles.status} ${styles[appointment.status.toLowerCase()]}`}
              >
                {statusLabels[appointment.status]}
              </span>

              {openedId === appointment.id ? (
                <FaChevronDown className={styles.icon} />
              ) : (
                <FaChevronRight className={styles.icon} />
              )}
            </div>
          </header>

          {openedId === appointment.id && (
            <div className={styles.content}>
              <div className={styles.row}>
                <span>Rozpoczęcie</span>

                <strong>
                  {new Date(appointment.startTime).toLocaleString('pl-PL')}
                </strong>
              </div>

              <div className={styles.row}>
                <span>Zakończenie</span>

                <strong>
                  {new Date(appointment.endTime).toLocaleString('pl-PL')}
                </strong>
              </div>

              <div className={styles.row}>
                <span>Powód wizyty</span>

                <strong>{appointment.reason}</strong>
              </div>

              <div className={styles.note}>
                <span>Notatka</span>

                <p>{appointment.notes || 'Brak notatki.'}</p>
              </div>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
