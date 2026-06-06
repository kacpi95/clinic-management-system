import { useState } from 'react';

import EmergencyProtocolCard from '../../features/patients/components/EmergencyProtocolCard/EmergencyProtocolCard';
import PatientCapacityCard from '../../features/patients/components/PatientCapacityCard/PatientCapacityCard';
import PatientsHeader from '../../features/patients/components/PatientsHeader/PatientsHeader';
import PatientsTable from '../../features/patients/components/PatientsTable/PatientsTable';
import styles from './Patients.module.scss';

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className={styles.wrapper}>
      <PatientsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PatientsTable searchTerm={searchTerm} />
      <div className={styles.bottomGrid}>
        <PatientCapacityCard />
        <EmergencyProtocolCard />
      </div>
    </div>
  );
}
