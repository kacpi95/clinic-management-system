import AnalyticsHeader from '../../features/analytics/components/AnalyticsHeader/AnalyticsHeader';
import AnalyticsStats from '../../features/analytics/components/AnalyticsStats/AnalyticsStats';
import AppointmentStatusCard from '../../features/analytics/components/AppointmentStatusCard/AppointmentStatusCard';
import VisitsChart from '../../features/analytics/components/VisitsChart/VisitsChart';
import VisitTypesTable from '../../features/analytics/components/VisitTypesTable/VisitTypesTable';
import styles from './Analytics.module.scss';

export default function Analytics() {
  return (
    <div className={styles.wrapper}>
      <AnalyticsHeader />
      <AnalyticsStats />
      <div className={styles.grid}>
        <VisitsChart />
        <AppointmentStatusCard />
      </div>
      <VisitTypesTable />
    </div>
  );
}
