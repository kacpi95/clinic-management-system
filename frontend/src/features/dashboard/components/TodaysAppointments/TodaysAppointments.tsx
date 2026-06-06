import styles from './TodaysAppointments.module.scss';
import { useAppointments } from '../../../appointments/hooks/useAppointments';
import patientOne from '../../../../assets/patient-1.png';

export default function TodaysAppointments() {
  const { appointments, isLoading, error } = useAppointments();

  const today = new Date().toDateString();

  const todaysAppointments = appointments.filter((appointment) => {
    return new Date(appointment.startTime).toDateString() === today;
  });

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
        <button className={styles.linkButton}>Zobacz wszystkie</button>
      </div>

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
              <article className={styles.card}>
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

                <div className={styles.status}>{appointment.status}</div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
