import Table from "../ui/Table";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AssetTable = ({ data }) => {
  const navigate = useNavigate();

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
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[value]}`}
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

  return <Table columns={columns} data={data} />;
};

export default AssetTable;
