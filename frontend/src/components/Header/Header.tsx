import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/useAuth';
import styles from './Header.module.scss';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/calendar': 'Kalendarz',
  '/patients': 'Pacjenci',
  '/analytics': 'Analityka',
  '/settings': 'Ustawienia',
};

export default function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const doctor = user?.doctor;
  const title = pageTitles[location.pathname] || 'Dashboard';

  const initials = `${doctor?.firstName?.charAt(0) || ''}${
    doctor?.lastName?.charAt(0) || ''
  }`;

  return (
    <header className={styles.wrapper}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>Panel zarządzania</p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.userInfo}>
          <strong className={styles.name}>
            Dr. {doctor?.firstName} {doctor?.lastName}
          </strong>
          <span className={styles.specialization}>
            {doctor?.specialization}
          </span>
        </div>

        <div
          onClick={() => navigate('/dashboard/settings')}
          className={styles.avatar}
        >
          {initials || 'DR'}
        </div>
      </div>
    </header>
  );
}
