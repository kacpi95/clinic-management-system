import { FaRegCalendar } from 'react-icons/fa';

import styles from './MainCard.module.scss';
import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { getAppointmentStats } from '../../../appointments/utils/getAppointmentStats';
import { getTodayAppointments } from '../../utils/getTodayAppointments';

export default function MainCard() {
  const date = new Date();

  const { calendarAppointments } = useCalendarAppointments();

  const todayAppointments = getTodayAppointments(calendarAppointments);

  const stats = getAppointmentStats(todayAppointments);

  const formattedDate = date.toLocaleDateString('pl-PL', {
    weekday: 'long',
  });

  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <article className={styles.mainCard}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>
          <FaRegCalendar />
        </span>
        <p>{capitalizedDate}</p>
      </div>

      <div className={styles.cardContent}>
        <h2>{stats.planned}</h2>
        <p>Zaplanowane wizyty</p>
      </div>

      <div className={styles.cardFooter}>
        <span>{stats.completed} zakończone</span>
        <span>{stats.canceled} anulowane</span>
      </div>
    </article>
  );
}
