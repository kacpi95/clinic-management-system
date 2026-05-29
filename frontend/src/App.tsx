import { Routes, Route, Navigate } from 'react-router-dom';

import AuthProvider from './context/AuthProvider';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Patients from './pages/Patients/Patients';
import Calendar from './pages/Calendar/Calendar';
import Analytics from './pages/Analytics/Analytics';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Navigate to='/login' replace />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='patients' element={<Patients />} />
            <Route path='calendar' element={<Calendar />} />
            <Route path='analytics' element={<Analytics />} />
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
