import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const { user, logout, isAuthenticated } = useAuth();
   const [cartItemCount, setCartItemCount] = useState(0);
   const [showUserMenu, setShowUserMenu] = useState(false);

   // Update cart count when localStorage changes
   useEffect(() => {
      const updateCartCount = () => {
         const cart = JSON.parse(localStorage.getItem("sportsphere-cart") || "[]");
         const count = cart.reduce((total, item) => total + item.quantity, 0);
         setCartItemCount(count);
      };

      updateCartCount();

      // Listen for storage changes
      window.addEventListener("storage", updateCartCount);

      // Custom event for cart updates within the same tab
      const handleCartUpdate = () => updateCartCount();
      window.addEventListener("cartUpdated", handleCartUpdate);

      return () => {
         window.removeEventListener("storage", updateCartCount);
         window.removeEventListener("cartUpdated", handleCartUpdate);
      };
   }, []);

   const isActive = (path) => {
      return location.pathname === path;
   };

   const handleLogout = () => {
      logout();
      navigate("/");
      setShowUserMenu(false);
   };

   return (
      <nav className="bg-white shadow">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
               <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                     <Link to="/" className="flex items-center">
                        <img
                           className="h-10 w-auto transform transition-all duration-300 hover:scale-105"
                           src="/sportssphere-logo.svg"
                           alt="SportsSphere"
                           onError={(e) => {
                              e.target.src = "/api/placeholder/40/40";
                           }}
                           style={{
                              filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))",
                           }}
                        />
                        <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                           SportsSphere
                        </span>
                     </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-6">
                     <Link
                        to="/"
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                           isActive("/")
                              ? "border-b-2 border-blue-500 text-gray-900"
                              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                     >
                        Home
                     </Link>
                     <Link
                        to="/events"
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                           isActive("/events")
                              ? "border-b-2 border-blue-500 text-gray-900"
                              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                     >
                        Events
                     </Link>
                     <Link
                        to="/clubs"
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                           isActive("/clubs")
                              ? "border-b-2 border-blue-500 text-gray-900"
                              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                     >
                        Clubs
                     </Link>
                     <Link
                        to="/store"
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                           isActive("/store")
                              ? "border-b-2 border-blue-500 text-gray-900"
                              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                     >
                        Store
                     </Link>
                     <Link
                        to="/scholarships"
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                           isActive("/scholarships")
                              ? "border-b-2 border-blue-500 text-gray-900"
                              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                     >
                        Scholarships
                     </Link>
                     <Link
                        to="/forums"
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                           isActive("/forums")
                              ? "border-b-2 border-blue-500 text-gray-900"
                              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                     >
                        Forums
                     </Link>
                  </div>
               </div>

               <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {isAuthenticated ? (
                     <div className="relative ml-3 flex items-center">
                        <Link to="/cart" className="text-gray-400 hover:text-gray-500 mr-4 relative">
                           <span className="sr-only">Shopping Cart</span>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                           </svg>
                           {cartItemCount > 0 && (
                              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                 {cartItemCount}
                              </span>
                           )}
                        </Link>

                        <div className="relative">
                           <button
                              onClick={() => setShowUserMenu(!showUserMenu)}
                              className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                           >
                              <span className="sr-only">Open user menu</span>
                              {user?.avatar ? (
                                 <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
                              ) : (
                                 <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                 </div>
                              )}
                           </button>

                           {showUserMenu && (
                              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                                 <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowUserMenu(false)}
                                 >
                                    Your Profile
                                 </Link>
                                 {user?.role === "admin" && (
                                    <Link
                                       to="/admin"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                       onClick={() => setShowUserMenu(false)}
                                    >
                                       Admin Dashboard
                                    </Link>
                                 )}
                                 {user?.role === "club_admin" && (
                                    <Link
                                       to="/club-dashboard"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                       onClick={() => setShowUserMenu(false)}
                                    >
                                       Club Dashboard
                                    </Link>
                                 )}
                                 <Link
                                    to="/rewards"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowUserMenu(false)}
                                 >
                                    Rewards
                                 </Link>
                                 <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                 >
                                    Sign out
                                 </button>
                              </div>
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="flex space-x-4">
                        <Link
                           to="/login"
                           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
                        >
                           Log in
                        </Link>
                        <Link
                           to="/register"
                           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                           Sign up
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
