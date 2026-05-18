import { FaRegCalendar } from 'react-icons/fa';

import styles from './MainCard.module.scss';
import { stats } from '../data/stats.mock';

export default function MainCard() {
  const date = new Date();

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
        <span>{stats.active} aktywne</span>
      </div>
    </article>
  );
}
