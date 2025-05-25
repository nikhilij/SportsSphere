import React from "react";
import AppWithProviders from "./routes/AppWithProviders";
import ErrorBoundary from "./components/common/ErrorBoundary";

const App = () => {
   return (
      <ErrorBoundary>
         <AppWithProviders />
      </ErrorBoundary>
   );
};

export default App;
