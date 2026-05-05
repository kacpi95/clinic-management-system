import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './AuthLayout.module.scss';
import img1 from '../../assets/img1.jpg';

export default function AuthLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={styles.wrapper} style={{ backgroundImage: `url(${img1})` }}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        {isHomePage ? (
          <div className={styles.homeCard}>
            <h1 className={styles.title}>Clinica Atelier</h1>

            <div className={styles.links}>
              <Link to='/login' className={styles.buttonPrimary}>
                Zaloguj się
              </Link>

              <Link to='/register' className={styles.buttonSecondary}>
                Zarejestruj się
              </Link>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
