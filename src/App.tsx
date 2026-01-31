import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/auth-context';
import { Toaster } from 'react-hot-toast';

// Placeholders for now
import Login from './pages/auth/login';
import Verify from './pages/auth/verify';
import MerchantDashboard from './pages/merchant/dashboard';
import NewDelivery from './pages/merchant/deliveries-new';
import MerchantDeliveryDetail from './pages/merchant/deliveries-detail';
import CourierDashboard from './pages/courier/dashboard';
import CourierMyDeliveries from './pages/courier/deliveries-list';
import CourierDeliveryDetail from './pages/courier/deliveries-detail';
import MerchantSettings from './pages/merchant/settings';

import AdminLayout from './pages/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminDeliveries from './pages/admin/deliveries';
import AdminDeliveryDetail from './pages/admin/deliveries/detail';
import AdminBusinesses from './pages/admin/businesses';
import AdminUsers from './pages/admin/users';

const ProtectedRoute = ({ role }: { role?: 'MERCHANT' | 'COURIER' | 'ADMIN' }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/" />; // or unauthorized page

  return <Outlet />;
};

function AppRoutes() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to={user?.role === 'ADMIN' ? '/admin' : user?.role === 'MERCHANT' ? '/merchant' : '/courier'} /> : <Login />} />
      <Route path="/verify" element={isAuthenticated ? <Navigate to={user?.role === 'ADMIN' ? '/admin' : user?.role === 'MERCHANT' ? '/merchant' : '/courier'} /> : <Verify />} />
      
      {/* Merchant Routes */}
      <Route element={<ProtectedRoute role="MERCHANT" />}>
        <Route path="/merchant" element={<MerchantDashboard />} />
        <Route path="/merchant/deliveries/new" element={<NewDelivery />} />
        <Route path="/merchant/deliveries/:id" element={<MerchantDeliveryDetail />} />
        <Route path="/merchant/settings" element={<MerchantSettings />} />
      </Route>

      {/* Courier Routes */}
      <Route element={<ProtectedRoute role="COURIER" />}>
        <Route path="/courier" element={<CourierDashboard />} />
        <Route path="/courier/my-deliveries" element={<CourierMyDeliveries />} />
        <Route path="/courier/deliveries/:id" element={<CourierDeliveryDetail />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
           <Route path="deliveries" element={<AdminDeliveries />} />
           <Route path="deliveries/:id" element={<AdminDeliveryDetail />} />
           <Route path="businesses" element={<AdminBusinesses />} />
           <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}
