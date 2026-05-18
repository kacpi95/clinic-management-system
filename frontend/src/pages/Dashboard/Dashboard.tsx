import DashboardHero from '../../features/dashboard/components/DashboardHero/DashboardHero';
import StatsGrid from '../../features/dashboard/components/StatsGrid/StatsGrid';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <DashboardHero />
        <StatsGrid />
        {/* TodaysAppointments */}
      </div>
      <div className={styles.rightSidebar}>
        {/* PatientFlowInsight  */}
        {/* UrgentTasks  */}
      </div>
    </div>
  );
}
