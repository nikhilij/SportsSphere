import React from "react";

const SimpleLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="bg-blue-600 text-white p-4 mb-6 rounded-lg">
        <h1 className="text-2xl font-bold">SportsSphere</h1>
        <p>Your Ultimate Sports Community Platform</p>
      </header>
      <main>
        {children || (
          <div className="text-center p-10">
            <h2 className="text-xl mb-4">Welcome to SportsSphere</h2>
            <p>This is a fallback page to ensure something is always rendered.</p>
          </div>
        )}
      </main>
      <footer className="mt-8 pt-4 border-t text-center text-gray-500">
        <p>© 2025 SportsSphere. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SimpleLayout;
