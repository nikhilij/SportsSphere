import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const AppWithProviders = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading app resources
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </AuthProvider>
  );
};

export default AppWithProviders;
