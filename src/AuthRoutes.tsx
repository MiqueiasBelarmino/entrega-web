import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, Role } from './contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const PublicRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (user) {
    // Redirect role-specific home
    if (user.role === 'ROOT' || user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'OWNER') return <Navigate to="/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
