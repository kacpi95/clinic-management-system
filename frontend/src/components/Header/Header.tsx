import { useLocation, useNavigate } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';

import { useAuth } from '../../context/useAuth';
import styles from './Header.module.scss';

type Props = {
  onMenuClick: () => void;
};

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/calendar': 'Kalendarz',
  '/dashboard/patients': 'Pacjenci',
  '/dashboard/analytics': 'Analityka',
  '/dashboard/settings': 'Ustawienia',
};

export default function Header({ onMenuClick }: Props) {
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
      <div className={styles.leftGroup}>
        <button
          type='button'
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label='Otwórz menu'
        >
          <HiBars3 />
        </button>

        <div className={styles.leftSection}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>Panel zarządzania</p>
        </div>
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

        <button
          type='button'
          onClick={() => navigate('/dashboard/settings')}
          className={styles.avatar}
          aria-label='Przejdź do ustawień profilu'
        >
          {initials || 'DR'}
        </button>
      </div>
    </header>
  );
}
