import React from "react";

class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error) {
      return { hasError: true, error };
   }

   componentDidCatch(error, errorInfo) {
      console.error("Error caught by boundary:", error, errorInfo);
   }

   render() {
      if (this.state.hasError) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
               <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                  <div className="flex flex-col items-center">
                     <div className="text-red-500 text-5xl mb-4">⚠️</div>
                     <h1 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h1>
                     <p className="text-gray-600 text-center mb-4">
                        We're sorry, but something unexpected happened. Please try refreshing the page.
                     </p>
                     <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                     >
                        Refresh Page
                     </button>
                  </div>
               </div>
            </div>
         );
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
