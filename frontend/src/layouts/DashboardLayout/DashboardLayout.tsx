import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        {/* header */}

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
