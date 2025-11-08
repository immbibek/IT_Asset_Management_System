import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import useAssetsData from "../../hooks/useAssetsData";

const AssetsListPage = () => {
  const navigate = useNavigate();
  const { assets } = useAssetsData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: "Asset ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Category", accessor: "category" },
    { header: "Serial Number", accessor: "serialNumber" },
    { header: "Purchase Date", accessor: "purchaseDate" },
    { header: "Cost", accessor: "cost" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const colors = {
          Available: "bg-green-100 text-green-800",
          Assigned: "bg-blue-100 text-blue-800",
          "Under Maintenance": "bg-orange-100 text-orange-800",
          Retired: "bg-gray-100 text-gray-800",
        };
        return (
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${colors[value]}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessor: "id",
      render: (value, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/assets/edit/${row.id}`)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Asset Management</h1>
          <p className="text-gray-600">Manage all IT assets</p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/assets/add")}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Asset
        </Button>
      </div>

      <Card>
        <div className="mb-4 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Table columns={columns} data={filteredAssets} />
      </Card>
    </div>
  );
};

export default AssetsListPage;
