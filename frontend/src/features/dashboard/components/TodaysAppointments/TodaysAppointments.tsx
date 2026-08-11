import styles from './TodaysAppointments.module.scss';
import patientOne from '../../../../assets/patient-1.png';
import { getTodayAppointments } from '../../utils/getTodayAppointments';
import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { useNavigate } from 'react-router-dom';

export default function TodaysAppointments() {
  const navigate = useNavigate();

  const { calendarAppointments, isLoading, error } = useCalendarAppointments();

  const todaysAppointments = getTodayAppointments(calendarAppointments);

  const statusLabels = {
    PLANNED: 'Zaplanowana',
    COMPLETED: 'Zakończona',
    CANCELED: 'Anulowana',
  };

  if (isLoading) {
    return <p>Ładowanie wizyt...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Dzisiejsze wizyty</h2>
        <button
          onClick={() => navigate('/dashboard/calendar')}
          className={styles.linkButton}
        >
          Zobacz wszystkie
        </button>
      </div>
      {todaysAppointments.length === 0 ? (
        <p className={styles.empty}>Brak wizyt na dziś.</p>
      ) : (
        <ul className={styles.list}>
          {todaysAppointments.map((appointment) => {
            const time = new Date(appointment.startTime).toLocaleTimeString(
              'pl-PL',
              {
                hour: '2-digit',
                minute: '2-digit',
              },
            );

            return (
              <li key={appointment.id} className={styles.item}>
                <article
                  onClick={() =>
                    navigate(`/dashboard/patients/${appointment.patientId}`)
                  }
                  className={styles.card}
                >
                  <div className={styles.time}>
                    <span>{time}</span>
                  </div>
                  <div className={styles.avatar}>
                    <img src={patientOne} alt='Zdjęcie pacjenta' />
                  </div>
                  <div className={styles.content}>
                    <h3>
                      {appointment.patient?.firstName}{' '}
                      {appointment.patient?.lastName}
                    </h3>
                    <p>{appointment.reason}</p>
                  </div>

                  <div
                    className={`${styles.status} ${styles[appointment.status.toLowerCase()]}`}
                  >
                    {statusLabels[appointment.status]}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
