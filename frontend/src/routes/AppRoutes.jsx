import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Import all pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Clubs from "../pages/Clubs";
import ClubDetails from "../pages/ClubDetails";
import Store from "../pages/Store";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Rewards from "../pages/Rewards";
import ClubDashboard from "../pages/ClubDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Profile from "../pages/Profile";
import Forums from "../pages/Forums";
import Scholarships from "../pages/Scholarships";
import NotFound from "../pages/NotFound";

// Import layout components
import MainLayout from "../components/layout/MainLayout";
import SimpleLayout from "../components/layout/SimpleLayout";

const AppRoutes = () => {
   return (
      <Routes>
         {/* Public routes */}
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route
            path="/events"
            element={
               <MainLayout>
                  <Events />
               </MainLayout>
            }
         />
         <Route
            path="/events/:id"
            element={
               <MainLayout>
                  <EventDetails />
               </MainLayout>
            }
         />
         <Route
            path="/clubs"
            element={
               <MainLayout>
                  <Clubs />
               </MainLayout>
            }
         />
         <Route
            path="/clubs/:id"
            element={
               <MainLayout>
                  <ClubDetails />
               </MainLayout>
            }
         />
         <Route path="/store" element={<Store />} />
         <Route
            path="/forums"
            element={
               <MainLayout>
                  <Forums />
               </MainLayout>
            }
         />
         <Route
            path="/scholarships"
            element={
               <MainLayout>
                  <Scholarships />
               </MainLayout>
            }
         />

         {/* Protected routes */}
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
            path="/profile"
            element={
               <ProtectedRoute>
                  <Profile />
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

         {/* Admin routes */}
         <Route
            path="/admin/*"
            element={
               <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
               </ProtectedRoute>
            }
         />

         {/* Club admin routes */}
         <Route
            path="/club-dashboard"
            element={
               <ProtectedRoute roles={["club_admin", "admin"]}>
                  <ClubDashboard />
               </ProtectedRoute>
            }
         />

         {/* 404 Route */}
         <Route
            path="*"
            element={
               <SimpleLayout title="Page Not Found" subtitle="The page you're looking for doesn't exist">
                  <div className="text-center py-12">
                     <h2 className="text-2xl font-semibold text-gray-900 mb-4">404 - Page Not Found</h2>
                     <p className="text-gray-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>
                     <a
                        href="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                     >
                        Go back home
                     </a>
                  </div>
               </SimpleLayout>
            }
         />
      </Routes>
   );
};

export default AppRoutes;
