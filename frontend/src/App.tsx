import { Routes, Route, Navigate } from 'react-router-dom';

import AuthProvider from './context/AuthProvider';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
