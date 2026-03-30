import { Link, Outlet, useLocation } from 'react-router-dom';

// import { styles } from './AuthLayout.module.scss';

export default function AuthLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      <h1>The Clinical Atelier</h1>

      <Outlet />

      <div>
        {isLoginPage ? (
          <p>
            Nie masz konta w Clinical Atelier?
            <Link to='/register'>Zarejestruj się</Link>
          </p>
        ) : (
          <p>
            Masz już konto? <Link to='/login'>Zaloguj się</Link>
          </p>
        )}
      </div>
    </div>
  );
}
