import { useState } from 'react';

import PatientCapacityCard from '../../features/patients/components/PatientCapacityCard/PatientCapacityCard';
import PatientsHeader from '../../features/patients/components/PatientsHeader/PatientsHeader';
import PatientsTable from '../../features/patients/components/PatientsTable/PatientsTable';
import styles from './Patients.module.scss';

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <div className={styles.wrapper}>
      <PatientsHeader
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        patients={[]}
      />
      <PatientsTable searchTerm={searchTerm} page={page} setPage={setPage} />
      <div className={styles.bottomGrid}>
        <PatientCapacityCard />
      </div>
    </div>
  );
}
