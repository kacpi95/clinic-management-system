import { useState } from 'react';

import PatientCapacityCard from '../../features/patients/components/PatientCapacityCard/PatientCapacityCard';
import PatientsHeader from '../../features/patients/components/PatientsHeader/PatientsHeader';
import PatientsTable from '../../features/patients/components/PatientsTable/PatientsTable';
import { usePatients } from '../../features/patients/hooks/usePatients';

import styles from './Patients.module.scss';

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { patients, isLoading, error } = usePatients();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <div className={styles.wrapper}>
      <PatientsHeader
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        patients={patients}
      />

      <PatientsTable
        patients={patients}
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
        page={page}
        setPage={setPage}
      />

      <div className={styles.bottomGrid}>
        <PatientCapacityCard />
      </div>
    </div>
  );
}
