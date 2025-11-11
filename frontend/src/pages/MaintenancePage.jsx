import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import axios from "axios"; // Import axios

const MaintenancePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    assetId: "", // Added assetId
    assetName: "", // Added assetName
    issueType: "", // Added issueType
    startDate: "", // Added startDate
    estimatedCompletion: "", // Added estimatedCompletion
    repairCost: "",
    notes: "",
    status: "In Progress", // Default status to "In Progress"
  });
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [assets, setAssets] = useState([]); // New state for assets
  const [stats, setStats] = useState({
    inProgress: 0,
    completedThisMonth: 0,
    totalCostThisMonth: 0,
  });
  const [error, setError] = useState(null); 

  const fetchMaintenanceData = async () => {
    try {
      const recordsRes = await axios.get("/api/maintenance", {
        params: { search: searchTerm },
      });
      setMaintenanceRecords(recordsRes.data);

      const statsRes = await axios.get("/api/maintenance/stats");
      setStats({
        inProgress: statsRes.data.inProgress ?? 0,
        completedThisMonth: statsRes.data.completedThisMonth ?? 0,
        totalCostThisMonth: statsRes.data.totalCostThisMonth ?? 0,
      });
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    }
  };

  const fetchAssets = async () => {
    try {
      const res = await axios.get("/api/assets");
      setAssets(res.data.data); // Access res.data.data
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    fetchMaintenanceData();
    fetchAssets(); // Fetch assets when component mounts
  }, [searchTerm]); // Refetch when searchTerm changes

  useEffect(() => {
    // Ensure assetName is correctly set if assetId changes or assets load later
    if (formData.assetId && Array.isArray(assets) && assets.length > 0) {
      const selectedAsset = assets.find(
        (asset) => asset._id === formData.assetId
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        assetName: selectedAsset ? selectedAsset.assetName : "",
      }));
    } else if (!formData.assetId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        assetName: "",
      }));
    }
  }, [formData.assetId, assets]); // Re-run when assetId or assets change

  const handleAssetChange = (e) => {
    const selectedAssetId = e.target.value;
    const selectedAsset = assets.find((asset) => asset._id === selectedAssetId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      assetId: selectedAssetId,
      assetName: selectedAsset ? selectedAsset.assetName : "", // Set assetName directly here
    }));
  };

  const handleAddLog = async () => {
    try {
      console.log("Form Data on Add Log:", formData); // Log formData for debugging
      console.log("Validation check - assetId:", formData.assetId, "assetName:", formData.assetName, "issueType:", formData.issueType, "startDate:", formData.startDate, "repairCost:", formData.repairCost, "status:", formData.status);

      // Basic client-side validation
      if (
        !formData.assetId ||
        !formData.assetName ||
        !formData.issueType ||
        !formData.startDate ||
        !formData.repairCost ||
        !formData.status
      ) {
        setError(
          "Please fill in all required fields: Asset, Issue Type, Start Date, Repair Cost, and Status."
        );
        console.log("Validation failed. Missing fields:", {
          assetId: formData.assetId,
          assetName: formData.assetName,
          issueType: formData.issueType,
          startDate: formData.startDate,
          repairCost: formData.repairCost,
          status: formData.status,
        });
        return;
      }

      await axios.post("/api/maintenance", {
        ...formData,
        cost: parseFloat(formData.repairCost), // Convert cost to number
        startDate: new Date(formData.startDate), // Convert startDate to Date object
        estimatedCompletion: formData.estimatedCompletion
          ? new Date(formData.estimatedCompletion)
          : undefined,
      });
      fetchMaintenanceData(); // Refresh data after adding
      setIsModalOpen(false);
      setFormData({
        assetId: "",
        assetName: "",
        issueType: "",
        startDate: "",
        estimatedCompletion: "",
        repairCost: "",
        notes: "",
        status: "In Progress", // Reset to default "In Progress"
      });
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error adding maintenance log:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
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
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {stats.inProgress}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 uppercase">
              Completed This Month
            </p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.completedThisMonth}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 uppercase">
              Total Cost (Month)
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ${stats.totalCostThisMonth.toFixed(2)}
            </p>
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
              {Array.isArray(maintenanceRecords) &&
                maintenanceRecords.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record._id.toString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div>
                        <div className="font-medium">{record.assetName}</div>
                        <div className="text-xs text-gray-500">
                          {record.assetId ? record.assetId.toString() : "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {record.issueType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(record.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {record.estimatedCompletion
                        ? new Date(
                            record.estimatedCompletion
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${record.cost.toFixed(2)}
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
        <div className="space-y-4 p-4">
          {" "}
          {/* Added padding to the modal content */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asset
            </label>
            <select
              value={formData.assetId}
              onChange={handleAssetChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an Asset</option>
              {Array.isArray(assets) &&
                assets.map((asset) => (
                  <option key={asset._id} value={asset._id}>
                    {asset.assetName} ({asset._id})
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Type
            </label>
            <input
              type="text"
              value={formData.issueType}
              onChange={(e) =>
                setFormData({ ...formData, issueType: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Hardware, Screen Damage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Completion
            </label>
            <input
              type="date"
              value={formData.estimatedCompletion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estimatedCompletion: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
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
