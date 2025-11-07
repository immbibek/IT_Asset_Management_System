import {
  LayoutDashboard,
  Package,
  Users,
  Wrench,
  TrendingDown,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const role = localStorage.getItem("role") || "admin";

  const adminMenu = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/assets", icon: Package, label: "Assets" },
    { path: "/assignments", icon: Users, label: "Assignments" },
    { path: "/employees", icon: Users, label: "Employees" },
    { path: "/maintenance", icon: Wrench, label: "Maintenance" },
    { path: "/depreciation", icon: TrendingDown, label: "Depreciation" },
    { path: "/requests", icon: AlertCircle, label: "Requests" },
  ];

  const employeeMenu = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/my-assets", icon: Package, label: "My Assets" },
    { path: "/report-issue", icon: AlertCircle, label: "Report Issue" },
  ];

  const menuItems = role === "admin" ? adminMenu : employeeMenu;

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">IT Asset Manager</h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 w-full transition">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
