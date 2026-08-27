import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './DashboardLayout.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <button
          type='button'
          className={styles.overlay}
          onClick={closeSidebar}
          aria-label='Zamknij menu'
        />
      )}

      <div className={styles.main}>
        <Header onMenuClick={openSidebar} />

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
