import { useState, useEffect } from "react";
import axios from "axios";

export default function useDashboardData() {
  const [stats, setStats] = useState(null);
  const [assetCategoryData, setAssetCategoryData] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [recentAssets, setRecentAssets] = useState([]);

  useEffect(() => {
    // Simulated fetch (this is where backend will connect later)
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        const { stats, assetCategoryData, monthlyTrend, statusData, recentAssets } = response.data;

        setStats(stats);
        setAssetCategoryData(assetCategoryData);
        setMonthlyTrend(monthlyTrend);
        setStatusData(statusData);
        setRecentAssets(recentAssets);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Optionally, set default or error states
      }
    };

    fetchData();
  }, []);

  return { stats, assetCategoryData, monthlyTrend, statusData, recentAssets };
}
