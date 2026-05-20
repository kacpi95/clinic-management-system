import { IoFilter } from 'react-icons/io5';
import { PiExport } from 'react-icons/pi';

import styles from './PatientsHeader.module.scss';

export default function PatientsHeader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>CENTRALNA BAZA DANYCH</p>

        <h1 className={styles.title}>Pacjenci</h1>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button}>
          <IoFilter className={styles.icon} />
          <span>Filtruj</span>
        </button>

        <button className={styles.button}>
          <PiExport className={styles.icon} />
          <span>Eksport</span>
        </button>
      </div>
    </div>
  );
}
