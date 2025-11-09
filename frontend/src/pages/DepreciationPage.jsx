import { Search } from "lucide-react";
import { useState } from "react";
import Card from "../components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DepreciationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const depreciationData = [
    { month: "Jan", value: 285000 },
    { month: "Feb", value: 280000 },
    { month: "Mar", value: 275000 },
    { month: "Apr", value: 268000 },
    { month: "May", value: 262000 },
    { month: "Jun", value: 255000 },
  ];

  const assets = [
    {
      id: "AST-001",
      name: 'MacBook Pro 16"',
      purchaseCost: "$2,499",
      currentValue: "$1,999",
      depreciation: "20%",
      purchaseDate: "2023-01-15",
      lifespan: "4 years",
    },
    {
      id: "AST-002",
      name: 'Dell Monitor 27"',
      purchaseCost: "$399",
      currentValue: "$319",
      depreciation: "20%",
      purchaseDate: "2023-02-20",
      lifespan: "5 years",
    },
    {
      id: "AST-003",
      name: "iPhone 14 Pro",
      purchaseCost: "$1,099",
      currentValue: "$769",
      depreciation: "30%",
      purchaseDate: "2023-03-10",
      lifespan: "3 years",
    },
    {
      id: "AST-004",
      name: "HP Printer LaserJet",
      purchaseCost: "$549",
      currentValue: "$329",
      depreciation: "40%",
      purchaseDate: "2022-11-05",
      lifespan: "5 years",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Depreciation Overview
        </h1>
        <p className="text-gray-600 mt-1">
          Track asset value depreciation over time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 uppercase">
              Total Purchase Cost
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2">$285,000</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 uppercase">
              Current Total Value
            </p>
            <p className="text-3xl font-bold text-green-600 mt-2">$255,000</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 uppercase">
              Total Depreciation
            </p>
            <p className="text-3xl font-bold text-red-600 mt-2">$30,000</p>
          </div>
        </Card>
      </div>

      <Card title="Asset Value Trend">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={depreciationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Total Asset Value"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Asset Depreciation Details">
        <div className="mb-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Asset ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Purchase Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Current Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Depreciation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Purchase Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Expected Lifespan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {asset.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {asset.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {asset.purchaseCost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {asset.currentValue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {asset.depreciation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {asset.purchaseDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {asset.lifespan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DepreciationPage;
