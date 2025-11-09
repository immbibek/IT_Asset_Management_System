import Button from "../ui/Button";
import { UserPlus, UserMinus } from "lucide-react";

const AssignmentsTable = ({ assets, onAssign, onUnassign }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Category
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Assigned To
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {assets.map((asset) => (
          <tr key={asset.id} className="hover:bg-gray-50">
            <td className="px-6 py-4">{asset.id}</td>
            <td className="px-6 py-4">{asset.name}</td>
            <td className="px-6 py-4">{asset.category}</td>
            <td className="px-6 py-4">
              {asset.assignedTo ? (
                <span className="text-blue-600">{asset.assignedTo}</span>
              ) : (
                <span className="text-gray-400">Not Assigned</span>
              )}
            </td>
            <td className="px-6 py-4">
              {asset.assignedTo ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onUnassign(asset)}
                >
                  <UserMinus className="w-4 h-4" /> Unassign
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onAssign(asset)}
                >
                  <UserPlus className="w-4 h-4" /> Assign
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AssignmentsTable;
