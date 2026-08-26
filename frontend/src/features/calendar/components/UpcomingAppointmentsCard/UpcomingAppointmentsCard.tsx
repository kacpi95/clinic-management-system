import { useNavigate } from 'react-router-dom';

import styles from './UpcomingAppointmentsCard.module.scss';
import { useCalendarAppointments } from '../../hooks/useCalendarAppointments';
import { getUpcomingAppointments } from '../../utils/getUpcomingAppointments';

export default function UpcomingAppointmentsCard() {
  const navigate = useNavigate();

  const { calendarAppointments } = useCalendarAppointments();

  const upcomingAppointments = getUpcomingAppointments(calendarAppointments);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Nadchodzące wizyty</h2>

      {upcomingAppointments.length === 0 ? (
        <p className={styles.empty}>Brak nadchodzących wizyt.</p>
      ) : (
        <div className={styles.list}>
          {upcomingAppointments.map((appointment) => {
            const date = new Date(appointment.startTime);

            const time = date.toLocaleTimeString('pl-PL', {
              hour: '2-digit',
              minute: '2-digit',
            });

            const day = date.toLocaleDateString('pl-PL', {
              day: '2-digit',
              month: '2-digit',
            });

            return (
              <button
                key={appointment.id}
                type='button'
                className={styles.item}
                onClick={() =>
                  navigate(`/dashboard/patients/${appointment.patientId}`)
                }
              >
                <div className={styles.time}>
                  <strong>{time}</strong>
                  <span>{day}</span>
                </div>

                <div className={styles.content}>
                  <strong>
                    {appointment.patient?.firstName}{' '}
                    {appointment.patient?.lastName}
                  </strong>

                  <span>{appointment.reason}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
