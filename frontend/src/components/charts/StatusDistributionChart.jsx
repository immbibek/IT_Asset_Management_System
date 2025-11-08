import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const StatusDistributionChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((item, index) => (
            <Cell key={index} fill={item.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusDistributionChart;
