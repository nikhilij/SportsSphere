import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppWithProviders from "./routes/AppWithProviders";
import SimpleLayout from "./components/layout/SimpleLayout";

console.debug("Rendering App component...");

const App = () => {
  return (
    <Router>
      <SimpleLayout>
        <AppWithProviders />
      </SimpleLayout>
    </Router>
  );
};

console.debug("App component rendered successfully.");

export default App;
