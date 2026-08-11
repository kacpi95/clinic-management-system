import { IoPersonAdd } from 'react-icons/io5';
import { FaRegCalendar } from 'react-icons/fa';

import styles from './SideCards.module.scss';
import { getTomorrowAppointments } from '../../utils/getTomorrowAppointments';
import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { usePatients } from '../../../patients/hooks/usePatients';

export default function SideCards() {
  const { patients } = usePatients();

  const { calendarAppointments } = useCalendarAppointments();

  const tomorrowAppointments = getTomorrowAppointments(calendarAppointments);
  return (
    <div className={styles.sideCards}>
      <article className={styles.smallCard}>
        <div className={styles.smallCardContent}>
          <span className={styles.icon}>
            <IoPersonAdd />
          </span>

          <div>
            <h3>{patients.length}</h3>
            <p>Moi pacjenci</p>
          </div>
        </div>
      </article>

      <article className={styles.appointmentCard}>
        <div className={styles.smallCardContent}>
          <span className={styles.icon}>
            <FaRegCalendar />
          </span>

          <div>
            <h3>{tomorrowAppointments.length}</h3>
            <p>Wizyty jutro</p>
          </div>
        </div>
      </article>
    </div>
  );
}
