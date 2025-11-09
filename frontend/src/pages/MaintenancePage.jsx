import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

const MaintenancePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    repairCost: "",
    notes: "",
    status: "",
  });

  const maintenanceRecords = [
    {
      id: "MNT-001",
      assetId: "AST-005",
      assetName: "HP Printer LaserJet",
      issueType: "Hardware",
      startDate: "2024-01-10",
      estimatedCompletion: "2024-01-15",
      status: "In Progress",
      cost: "$120",
    },
    {
      id: "MNT-002",
      assetId: "AST-018",
      assetName: "Dell Laptop",
      issueType: "Screen Damage",
      startDate: "2024-01-08",
      estimatedCompletion: "2024-01-20",
      status: "Pending Parts",
      cost: "$450",
    },
    {
      id: "MNT-003",
      assetId: "AST-023",
      assetName: "MacBook Pro",
      issueType: "Battery Replacement",
      startDate: "2024-01-05",
      estimatedCompletion: "2024-01-12",
      status: "Completed",
      cost: "$199",
    },
  ];

  const handleAddLog = () => {
    setIsModalOpen(false);
    setFormData({ repairCost: "", notes: "", status: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Maintenance Tracking
          </h1>
          <p className="text-gray-600 mt-1">
            Track assets under maintenance and repair costs
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Log Maintenance
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 uppercase">
              In Progress
            </p>
            <p className="text-3xl font-bold text-orange-600 mt-2">5</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 uppercase">
              Completed This Month
            </p>
            <p className="text-3xl font-bold text-green-600 mt-2">12</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 uppercase">
              Total Cost (Month)
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2">$3,450</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search maintenance records..."
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
                  Record ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Issue Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Est. Completion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div>
                      <div className="font-medium">{record.assetName}</div>
                      <div className="text-xs text-gray-500">
                        {record.assetId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {record.issueType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {record.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {record.estimatedCompletion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === "In Progress"
                          ? "bg-orange-100 text-orange-800"
                          : record.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log Maintenance Record"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repair Cost
            </label>
            <input
              type="text"
              value={formData.repairCost}
              onChange={(e) =>
                setFormData({ ...formData, repairCost: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="199.99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select status</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Parts">Pending Parts</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Details about the repair..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddLog}>
              Add Log
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MaintenancePage;
