import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { token, user } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== 'ADMIN') return <Navigate to="/menu" replace />;

  return <Outlet />;
};

export default AdminRoute;
