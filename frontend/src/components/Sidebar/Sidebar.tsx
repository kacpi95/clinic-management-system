import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.scss';

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/calendar', label: 'Kalendarz' },
  { path: '/patients', label: 'Pacjenci' },
  { path: '/analytics', label: 'Analityka' },
  { path: '/settings', label: 'Ustawienia' },
];

export default function Sidebar() {
  return (
    <aside className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>+</div>

        <div>
          <h1 className={styles.name}>The Clinical Atelier</h1>
          <p className={styles.subtitle}>Medical Administration</p>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <button className={styles.button}>Nowa wizyta</button>
      </div>
    </aside>
  );
}
