import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Rewards from "./pages/Rewards";
import ClubDashboard from "./pages/ClubDashboard";

const App = () => {
   return (
      <Router>
         <AuthProvider>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/checkout" element={<Checkout />} />
               <Route path="/rewards" element={<Rewards />} />
               <Route path="/club/dashboard" element={<ClubDashboard />} />
               {/* Add more routes as needed */}
            </Routes>
         </AuthProvider>
      </Router>
   );
};

export default App;
