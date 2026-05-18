import { IoPersonAdd } from 'react-icons/io5';
import { IoIosWarning } from 'react-icons/io';

import styles from './SideCards.module.scss';
import { stats } from '../data/stats.mock';

export default function SideCards() {
  return (
    <div className={styles.sideCards}>
      <article className={styles.smallCard}>
        <div className={styles.smallCardContent}>
          <span className={styles.icon}>
            <IoPersonAdd />
          </span>

          <div>
            <h3>{stats.newPatients}</h3>
            <p>Nowi pacjenci</p>
          </div>
        </div>
      </article>

      <article className={styles.alertCard}>
        <div className={styles.smallCardContent}>
          <span className={styles.icon}>
            <IoIosWarning />
          </span>

          <div>
            <h3>{stats.alerts}</h3>
            <p>Ostrzeżenia</p>
          </div>
        </div>
      </article>
    </div>
  );
}
