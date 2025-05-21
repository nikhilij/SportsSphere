import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400">
            <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 flex flex-col items-center">
                <svg
                    className="w-24 h-24 text-blue-500 mb-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 48 48"
                >
                    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M16 20c0-4 8-4 8 0m0 0c0-4 8-4 8 0m-8 8v2"
                    />
                </svg>
                <h1 className="text-5xl font-extrabold text-blue-700 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                    Oops! The page you are looking for does not exist or has been moved.<br />
                    Go back to the homepage to continue exploring SportsSphere.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Go Home
                </Link>
            </div>
            <footer className="mt-10 text-white opacity-70">
                &copy; {new Date().getFullYear()} SportsSphere. All rights reserved.
            </footer>
        </div>
    );
}