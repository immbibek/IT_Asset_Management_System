import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import employeeService from "../services/employeeService";
import axios from "axios"; // Import axios for submitting issue

const IssueReportPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // This `id` is the employee ID
  const [formData, setFormData] = useState({
    assetId: "",
    issueType: "",
    priority: "",
    description: "",
  });
  const [employeeAssets, setEmployeeAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeAssets = async () => {
      try {
        const assets = await employeeService.getEmployeeAssets(id);
        setEmployeeAssets(assets);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeAssets();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/issues", {
        ...formData,
        reportingEmployeeId: id, // Add the employee ID to the form data
      });
      navigate(`/employees/${id}`);
    } catch (err) {
      console.error("Failed to report issue:", err);
      setError(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <p>Loading assets...</p>;
  if (error) return <p>Error loading assets: {error.message}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/employees/${id}`)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Report Issue</h1>
          <p className="text-gray-600 mt-1">
            Report a problem with an assigned asset
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Asset
              </label>
              <select
                name="assetId"
                value={formData.assetId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose an asset</option>
                {employeeAssets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} (SN: {asset.serialNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type
              </label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select issue type</option>
                <option value="Hardware">Hardware Issue</option>
                <option value="Software">Software Issue</option>
                <option value="Performance">Performance Issue</option>
                <option value="Damage">Physical Damage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the issue in detail..."
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" variant="primary">
                Submit Report
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/employees/${id}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default IssueReportPage;
