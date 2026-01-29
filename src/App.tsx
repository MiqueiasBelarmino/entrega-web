import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, PublicRoute } from './AuthRoutes';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BusinessDetail from './pages/BusinessDetail';
import Dashboard from './pages/Dashboard';
import NewBusiness from './pages/Dashboard/NewBusiness';
import ManageBusiness from './pages/Dashboard/ManageBusiness';
import ManagePromotions from './pages/Dashboard/ManagePromotions';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Catalog & Shared Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/business/:slug" element={<BusinessDetail />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['OWNER']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/new-business" element={<NewBusiness />} />
            <Route path="/dashboard/manage/:slug" element={<ManageBusiness />} />
            <Route path="/dashboard/promotions/:slug" element={<ManagePromotions />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'ROOT']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
