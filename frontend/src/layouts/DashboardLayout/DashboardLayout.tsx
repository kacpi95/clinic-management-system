import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>
      {/* sidebar */}
      <div className={styles.main}>
        {/* header */}

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
