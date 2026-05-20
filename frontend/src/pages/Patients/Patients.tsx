import PatientsHeader from '../../features/patients/components/PatientsHeader/PatientsHeader';
import PatientsTable from '../../features/patients/components/PatientsTable/PatientsTable';
import styles from './Patients.module.scss';

export default function Patients() {
  return (
    <div className={styles.wrapper}>
      <PatientsHeader />
      <PatientsTable />
      <div className={styles.bottomGrid}>
        {/* PatientCapacityCard */}
        {/* EmergencyProtocolCard */}
      </div>
    </div>
  );
}
