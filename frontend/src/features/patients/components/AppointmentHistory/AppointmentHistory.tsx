import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import toast from 'react-hot-toast';

import type { Appointment } from '../../../appointments/types/appointment.type';
import styles from './AppointmentHistory.module.scss';
import { getVisitWord } from '../../utils/getVisitWord';
import { deleteAppointment } from '../../../appointments/services/appointment.api';
import { getAppointmentDisplayStatus } from '../../../../utils/getAppointmentDisplayStatus';

type Props = {
  appointments: Appointment[];
  onAppointmentDeleted: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const statusLabels = {
  PLANNED: 'Zaplanowana',
  COMPLETED: 'Zakończona',
  CANCELED: 'Anulowana',
};

export default function AppointmentHistory({
  appointments,
  onAppointmentDeleted,
  page,
  setPage,
}: Props) {
  const [openedId, setOpenedId] = useState<number | null>(null);

  const itemsPerPage = 8;

  const appointmentStartIndex = (page - 1) * itemsPerPage;

  const visibleAppointments = appointments.slice(
    appointmentStartIndex,
    appointmentStartIndex + itemsPerPage,
  );

  const appointmentPages = Math.ceil(appointments.length / itemsPerPage);

  const handleDelete = async (id: number) => {
    try {
      await deleteAppointment(id);

      await onAppointmentDeleted();

      setOpenedId(null);

      toast.success('Wizyta została usunięta');
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : 'Nie udało się usunąć wizyty',
      );
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Historia wizyt</h2>

        <span
          className={styles.counter}
        >{`${appointments.length} ${getVisitWord(appointments.length)}`}</span>
      </div>
      {visibleAppointments.map((appointment) => {
        const status = getAppointmentDisplayStatus(appointment);
        return (
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
                  className={`${styles.status} ${styles[status.toLowerCase()]}`}
                >
                  {statusLabels[status]}
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
                {appointment.status !== 'COMPLETED' && (
                  <div className={styles.actions}>
                    <button
                      type='button'
                      className={styles.deleteButton}
                      onClick={() => handleDelete(appointment.id)}
                    >
                      <MdDeleteOutline />
                      Usuń wizytę
                    </button>
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}
      {appointmentPages > 1 && (
        <div className={styles.pagination}>
          <button
            type='button'
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Poprzednia
          </button>

          <span>
            {page} / {appointmentPages}
          </span>

          <button
            type='button'
            disabled={page === appointmentPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Następna
          </button>
        </div>
      )}
    </section>
  );
}
