import DashboardHero from '../../features/dashboard/components/DashboardHero/DashboardHero';
import PatientFlowInsight from '../../features/dashboard/components/PatientFlowInsight/PatientFlowInsight';
import StatsGrid from '../../features/dashboard/components/StatsGrid/StatsGrid';
import TodaysAppointments from '../../features/dashboard/components/TodaysAppointments/TodaysAppointments';
import UrgentTasks from '../../features/dashboard/components/UrgentTasks/UrgentTasks';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <DashboardHero />
        <StatsGrid />
        <TodaysAppointments />
      </div>
      <div className={styles.rightSidebar}>
        <PatientFlowInsight />
        <UrgentTasks />
      </div>
    </div>
  );
}
