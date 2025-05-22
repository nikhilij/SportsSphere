// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "../contexts/AuthContext";
// import AppRoutes from "./AppRoutes";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// console.debug("Initializing AppWithProviders component...");

// // Loading component
// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center h-screen bg-gray-50">
//     <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
//   </div>
// );

// console.debug("Wrapping AppWithProviders with BrowserRouter...");

// const AppWithProviders = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     console.debug("Simulating resource loading in AppWithProviders...");
//     setTimeout(() => {
//       setIsLoading(false);
//       console.debug("Resource loading complete.");
//     }, 500);
//   }, []);

//   if (isLoading) {
//     console.debug("AppWithProviders is in loading state.");
//     return <LoadingSpinner />;
//   }

//   console.debug("Rendering AppWithProviders content...");
//   return (
//     <AuthProvider>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <AppRoutes />
//     </AuthProvider>
//   );
// };

// console.debug("AppWithProviders component initialized successfully.");

// export default AppWithProviders;
