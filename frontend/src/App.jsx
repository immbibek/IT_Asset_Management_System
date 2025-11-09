import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";

// pages
import DashboardPage from "./pages/DashboardPage";
import AssetsListPage from "./pages/Assets/AssetsListPage";
import AddAssetPage from "./pages/Assets/AddAssetPage";
import EditAssetPage from "./pages/Assets/EditAssetPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import EmployeesPage from "./pages/EmployeesPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* All protected/dashboard UI */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assets" element={<AssetsListPage />} />
        <Route path="/assets/add" element={<AddAssetPage />} />
        <Route path="/assets/edit/:id" element={<EditAssetPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        {/* Add more pages here */}
      </Route>
    </Routes>
  );
};

export default App;
