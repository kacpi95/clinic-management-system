import { FaRegPlusSquare } from 'react-icons/fa';

import styles from './EmergencyProtocolCard.module.scss';

export default function EmergencyProtocolCard() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>
        <FaRegPlusSquare />
      </span>
      <h5 className={styles.title}>Protokół awaryjny</h5>
      <p className={styles.description}>
        Aktywny dla Oddziału Kardiologii – kliknij, aby uzyskać szczegółowy
        raport.
      </p>
      <button className={styles.button}>Wyświetl alert</button>
    </div>
  );
}
