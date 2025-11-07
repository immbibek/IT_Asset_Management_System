import { useState, useEffect } from "react";
// Later replace axios with your API
// import axios from "axios";

export default function useDashboardData() {
  const [stats, setStats] = useState(null);
  const [assetCategoryData, setAssetCategoryData] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [recentAssets, setRecentAssets] = useState([]);

  useEffect(() => {
    // Simulated fetch (this is where backend will connect later)
    const fetchData = async () => {
      // Example if backend existed:
      // const response = await axios.get("/api/dashboard");
      // setStats(response.data.stats);

      // TEMPORARY STATIC DATA FOR UI
      setStats({
        totalAssets: 313,
        assigned: 245,
        maintenance: 15,
        openRequests: 8,
      });

      setAssetCategoryData([
        { name: 'Laptops', value: 45 },
        { name: 'Monitors', value: 60 },
        { name: 'Keyboards', value: 80 },
        { name: 'Mice', value: 75 },
        { name: 'Phones', value: 30 },
      ]);

      setMonthlyTrend([
        { month: 'Jan', assets: 180, assigned: 150 },
        { month: 'Feb', assets: 195, assigned: 165 },
        { month: 'Mar', assets: 220, assigned: 180 },
        { month: 'Apr', assets: 250, assigned: 210 },
        { month: 'May', assets: 270, assigned: 230 },
        { month: 'Jun', assets: 290, assigned: 245 },
      ]);

      setStatusData([
        { name: 'Available', value: 45, color: '#10b981' },
        { name: 'Assigned', value: 245, color: '#3b82f6' },
        { name: 'Under Maintenance', value: 15, color: '#f59e0b' },
        { name: 'Retired', value: 8, color: '#ef4444' },
      ]);

      setRecentAssets([
        { id: 'AST-001', name: 'MacBook Pro 16"', category: 'Laptop', status: 'Available' },
        { id: 'AST-002', name: 'Dell Monitor 27"', category: 'Monitor', status: 'Assigned' },
        { id: 'AST-003', name: 'iPhone 14 Pro', category: 'Phone', status: 'Available' },
        { id: 'AST-004', name: 'Logitech Mouse', category: 'Accessory', status: 'Assigned' },
      ]);
    };

    fetchData();
  }, []);

  return { stats, assetCategoryData, monthlyTrend, statusData, recentAssets };
}
