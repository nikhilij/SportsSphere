import React from "react";
import { Link } from "react-router-dom";

const FallbackPage = () => {
  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to SportsSphere</h2>
      <p className="mb-6">This is a fallback page to ensure content is visible.</p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Home
          </Link>
          <Link to="/events" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Events
          </Link>
          <Link to="/clubs" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Clubs
          </Link>
        </div>
      </div>

      <div className="p-6 bg-gray-100 rounded-lg max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-2">Debugging Info</h3>
        <p className="text-left">
          If you're seeing this page, your React app is now rendering successfully, but the specific page content might
          still be encountering issues. Check your browser console for more detailed error messages.
        </p>
      </div>
    </div>
  );
};

export default FallbackPage;
