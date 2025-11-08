import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";

// pages
import DashboardPage from "./pages/DashboardPage";
import AssetsListPage from "./pages/Assets/AssetsListPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* All protected/dashboard UI */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assets" element={<AssetsListPage />} />

        {/* Add more pages here */}
      </Route>
    </Routes>
  );
};

export default App;
