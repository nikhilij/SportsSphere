import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { Provider } from "react-redux";
import store from "../redux/store";
import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppWithProviders = () => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 500);
   }, []);

   if (isLoading) {
      return (
         <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
         </div>
      );
   }

   return (
      <Provider store={store}>
         <Router>
            <AuthProvider>
               <AppRoutes />
               <ToastContainer position="top-right" autoClose={3000} />
            </AuthProvider>
         </Router>
      </Provider>
   );
};

export default AppWithProviders;
