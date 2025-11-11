import Table from "../ui/Table";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AssetTable = ({ data, onDelete }) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (asset) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${asset.assetName}"?\n\nAsset ID: ${asset.id}\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    console.log("=== DELETE DEBUG ===");
    console.log("Deleting asset ID:", asset.id);

    try {
      setDeletingId(asset.id);
      await onDelete(asset.id);
      console.log(`Asset ${asset.id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete asset:", error);
      alert(`Failed to delete asset: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    { header: "Asset ID", accessor: "id" },
    { header: "Name", accessor: "assetName" }, // Changed from 'name' to 'assetName'
    { header: "Category", accessor: "category" },
    { header: "Serial Number", accessor: "serialNumber" },
    { header: "Purchase Date", accessor: "purchaseDate" },
    { header: "Cost", accessor: "cost" },
    { header: "Warranty (Months)", accessor: "warranty" }, // New column
    { header: "Supplier", accessor: "supplier" }, // New column
    { header: "Location", accessor: "location" }, // New column
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const colors = {
          Available: "bg-green-100 text-green-800",
          Assigned: "bg-blue-100 text-blue-800",
          "Under Maintenance": "bg-orange-100 text-orange-800",
          Retired: "bg-red-100 text-red-800", // Added Retired status
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              colors[value] || "bg-gray-100 text-gray-800"
            }`}
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/assets/edit/${row.id}`)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit Asset"
          >
            <Edit className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleDelete(row)}
            disabled={deletingId === row.id}
            className={`p-1 rounded transition-colors ${
              deletingId === row.id
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-600 hover:bg-red-50"
            }`}
            title="Delete Asset"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={data} />;
};

export default AssetTable;
