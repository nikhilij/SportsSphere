import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary";

console.debug("Initializing React application...");

createRoot(document.getElementById("root")).render(
  <StrictMode>
  
    <App />
  </StrictMode>
);

console.debug("React application mounted successfully.");
