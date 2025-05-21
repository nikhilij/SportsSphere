import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Import Pages
import Home from '../pages/Home';
import Events from '../pages/Events';
import EventDetails from '../pages/EventDetails';
import Clubs from '../pages/Clubs';
import ClubDetails from '../pages/ClubDetails';
import Store from '../pages/Store';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Scholarship from '../pages/Scholarship';
import Rewards from '../pages/Rewards';
import Profile from '../pages/Profile';
import AdminDashboard from '../pages/AdminDashboard';
import ClubDashboard from '../pages/ClubDashboard';
import Forums from '../pages/Forums';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import TestAdminAuth from '../pages/TestAdminAuth';

// Import Layout Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading while authentication state is being determined
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and user doesn't have it
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required role (if specified)
  return children;
};

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:id" element={<ClubDetails />} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test-admin" element={<TestAdminAuth />} />

          {/* Protected Routes */}
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/scholarships" 
            element={
              <ProtectedRoute>
                <Scholarship />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rewards" 
            element={
              <ProtectedRoute>
                <Rewards />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes - Using wildcard to handle all admin routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/forums" 
            element={
              <ProtectedRoute>
                <Forums />
              </ProtectedRoute>
            } 
          />

          {/* Club Admin Routes */}
          <Route 
            path="/club-dashboard" 
            element={
              <ProtectedRoute requiredRole="club_admin">
                <ClubDashboard />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;
