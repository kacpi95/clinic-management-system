import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/useAuth';

export default function PublicRoute() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to='/dashboard' replace />;
  }
  return <Outlet />;
}
