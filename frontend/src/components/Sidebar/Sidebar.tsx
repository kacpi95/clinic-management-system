import { NavLink, useNavigate } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';

import logo from '../../assets/logo.png';
import styles from './Sidebar.module.scss';
import { useAuth } from '../../context/useAuth';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { path: '/dashboard', label: 'Dashboard', end: true },
  { path: '/dashboard/calendar', label: 'Kalendarz' },
  { path: '/dashboard/patients', label: 'Pacjenci' },
  { path: '/dashboard/analytics', label: 'Analityka' },
  { path: '/dashboard/settings', label: 'Ustawienia' },
];

export default function Sidebar({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login', { replace: true });
  };

  return (
    <aside className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt='Logo' />
        </div>

        <div>
          <p className={styles.name}>The Clinical Atelier</p>
          <p className={styles.subtitle}>Medical Administration</p>
        </div>
        <button
          type='button'
          className={styles.closeButton}
          onClick={onClose}
          aria-label='Zamknij menu'
        >
          <HiXMark />
        </button>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <button
          type='button'
          className={styles.buttonLogout}
          onClick={handleLogout}
        >
          Wyloguj
        </button>
        <button
          type='button'
          className={styles.button}
          onClick={() => navigate('/dashboard/patients/new')}
        >
          Dodaj nowego pacjenta
        </button>
      </div>
    </aside>
  );
}
