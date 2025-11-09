import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AssetProvider } from "./context/AssetContext.jsx";
import { EmployeeProvider } from "./context/EmployeeContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AssetProvider>
        <EmployeeProvider>
          <App />
        </EmployeeProvider>
      </AssetProvider>
    </AuthProvider>
  </BrowserRouter>
);
