import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

import type { Appointment } from '../../../appointments/types/appointment.type';
import styles from './AppointmentHistory.module.scss';

type Props = {
  appointments: Appointment[];
};

export default function AppointmentHistory({ appointments }: Props) {
  const [openedId, setOpenedId] = useState<number | null>(null);

  return (
    <section className={styles.wrapper}>
      <h2>Historia wizyt</h2>

      {appointments.map((appointment) => (
        <article key={appointment.id} className={styles.card}>
          <header
            className={styles.header}
            onClick={() =>
              setOpenedId(openedId === appointment.id ? null : appointment.id)
            }
          >
            <div>
              <strong>{appointment.reason}</strong>
              <span>
                {new Date(appointment.startTime).toLocaleDateString()}
              </span>
            </div>

            {openedId === appointment.id ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </header>

          {openedId === appointment.id && (
            <div className={styles.content}>
              <p>Status: {appointment.status}</p>
              <p>Notatka: {appointment.notes}</p>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
