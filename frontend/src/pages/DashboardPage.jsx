import useDashboardData from "../hooks/useDashboardData";
import StatCard from "../components/ui/StadCard";
import Card from "../components/ui/Card";

import AssetsByCategoryChart from "../components/charts/AssetByCategoryChart";
import StatusDistributionChart from "../components/charts/StatusDistributionChart";
import AssetGrowthTrendChart from "../components/charts/AssetGrowthTrendChart";
import RecentAssetsTable from "../components/tables/RecentAssetsTable";

import { Package, Users, Wrench, AlertCircle } from "lucide-react";

const DashboardPage = () => {
  const { stats, assetCategoryData, monthlyTrend, statusData, recentAssets } =
    useDashboardData();

  if (!stats) return <p>Loading Dashboard...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Overview of IT assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Assets"
          value={stats.totalAssets}
          icon={<Package />}
        />
        <StatCard title="Assigned" value={stats.assigned} icon={<Users />} />
        <StatCard
          title="Maintenance"
          value={stats.maintenance}
          icon={<Wrench />}
        />
        <StatCard
          title="Open Requests"
          value={stats.requests}
          icon={<AlertCircle />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Assets by Category">
          <AssetsByCategoryChart data={assetCategoryData} />
        </Card>
        <Card title="Asset Status">
          <StatusDistributionChart data={statusData} />
        </Card>
      </div>

      <Card title="Asset Growth Trend">
        <AssetGrowthTrendChart data={monthlyTrend} />
      </Card>

      <Card title="Recently Added Assets">
        <RecentAssetsTable data={recentAssets} />
      </Card>
    </div>
  );
};

export default DashboardPage;
