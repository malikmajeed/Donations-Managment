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
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/students"
        element={
          <PrivateRoute>
            <StudentsPage />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/causes"
        element={
          <PrivateRoute>
            <CausesPage />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/donations"
        element={
          <PrivateRoute>
            <DonationsPage />
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
