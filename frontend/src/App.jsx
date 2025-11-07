import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/*"
        element={
          <>
            <Sidebar />
            <Navbar />
            {/* Placeholder for pages */}
            <div className="ml-64 mt-16 p-6 text-gray-700">Dashboard Page</div>
          </>
        }
      />
    </Routes>
  );
};

export default App;
