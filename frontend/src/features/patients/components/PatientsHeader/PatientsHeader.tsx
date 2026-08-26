import { IoFilter } from 'react-icons/io5';
import { PiExport } from 'react-icons/pi';

import styles from './PatientsHeader.module.scss';
import { downloadPatientsJson } from '../../utils/exportPatients';
import type { PatientsHeaderProps } from '../../types/patient.types';

export default function PatientsHeader({
  searchTerm,
  setSearchTerm,
  patients,
}: PatientsHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>CENTRALNA BAZA DANYCH</p>
        <h2 className={styles.title}>Pacjenci</h2>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchBox}>
          <IoFilter className={styles.icon} />

          <input
            type='text'
            placeholder='Szukaj pacjenta...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          type='button'
          className={styles.button}
          onClick={() => downloadPatientsJson(patients)}
        >
          <PiExport className={styles.icon} />
          <span>Eksport</span>
        </button>
      </div>
    </div>
  );
}
