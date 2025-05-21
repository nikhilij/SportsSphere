import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppWithProviders from "./routes/AppWithProviders";

const App = () => {
  return (
    <Router>
      <AppWithProviders />
    </Router>
  );
}

export default App;






