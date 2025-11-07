import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />

      {/* Main Content */}
      <div className="ml-64 mt-16 p-6 min-h-screen bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
