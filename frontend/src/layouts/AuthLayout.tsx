import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AuthLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isHomePage = location.pathname === '/';

  return (
    <div>
      <h1>The Clinical Atelier</h1>

      {isHomePage && (
        <div>
          <p>
            <Link to='/login'>Zaloguj się</Link>
          </p>
          <p>
            <Link to='/register'>Zarejestruj się</Link>
          </p>
        </div>
      )}

      <Outlet />

      {!isHomePage && (
        <div>
          {isLoginPage ? (
            <p>
              Nie masz konta w Clinical Atelier?{' '}
              <Link to='/register'>Zarejestruj się</Link>
            </p>
          ) : isRegisterPage ? (
            <p>
              Masz już konto? <Link to='/login'>Zaloguj się</Link>
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
