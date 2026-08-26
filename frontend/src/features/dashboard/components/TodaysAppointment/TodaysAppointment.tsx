import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { getNextAppointment } from '../../utils/getNextAppointment';
import styles from './TodaysAppointment.module.scss';

export default function TodaysAppointments() {
  const { calendarAppointments } = useCalendarAppointments();

  const nextAppointment = getNextAppointment(calendarAppointments);

  if (!nextAppointment) {
    return (
      <article className={styles.promoCard}>
        <div className={styles.overlay} />
        <div className={styles.promoContent}>
          <p className={styles.promoEyebrow}>NAJBLIŻSZA WIZYTA</p>
          <h3>Brak zaplanowanych wizyt</h3>
          <span>Nie ma żadnych nadchodzących wizyt.</span>
        </div>
      </article>
    );
  }

  const appointmentDate = new Date(nextAppointment.startTime);

  const formattedDate = appointmentDate.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
  });

  const formattedTime = appointmentDate.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className={styles.promoCard}>
      <div className={styles.overlay} />

      <div className={styles.promoContent}>
        <p className={styles.promoEyebrow}>NAJBLIŻSZA WIZYTA</p>
        <h3>
          {nextAppointment?.patient?.firstName}{' '}
          {nextAppointment?.patient?.lastName}
        </h3>
        <span>
          {formattedDate}, {formattedTime}
        </span>
        <span>{nextAppointment.reason}</span>
      </div>
    </article>
  );
}
