import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';

// Page Components
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import StudentsPage from '../pages/Students/StudentsPage';
import CausesPage from '../pages/Causes/CausesPage';
import DonationsPage from '../pages/Donations/DonationsPage';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/log-in" element={<LoginPage />} />
      <Route path="/auth/sign-up" element={<RegisterPage />} />
      
      {/* Unprotected Routes */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/causes" element={<CausesPage />} />
      <Route path="/donations" element={<DonationsPage />} />
      
      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      
      {/* Error Routes */}
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
