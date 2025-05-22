import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900 bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* We wrap children in a div that doesn't have min-height so pages can control their own height */}
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
