import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const AssetGrowthTrendChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="assets"
          stroke="#3b82f6"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="assigned"
          stroke="#10b981"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AssetGrowthTrendChart;
