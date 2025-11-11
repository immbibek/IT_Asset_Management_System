import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useState, useEffect } from "react";
import employeeService from "../services/employeeService"; // Import the new service
import axios from "axios"; // Import axios for fetching employee details

const EmployeeAssetsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Fetch employee details (assuming a /api/users/:id endpoint exists or can be created)
        // For now, we'll use a placeholder or fetch all users and find the one
        const allEmployees = await employeeService.getEmployees();
        const currentEmployee = allEmployees.find(emp => emp._id === id);
        setEmployee(currentEmployee);

        const employeeAssets = await employeeService.getEmployeeAssets(id);
        setAssets(employeeAssets);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  if (loading) return <p>Loading employee assets...</p>;
  if (error) return <p>Error loading employee assets: {error.message}</p>;
  if (!employee) return <p>Employee not found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/employees")}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employee Assets</h1>
          <p className="text-gray-600 mt-1">
            {employee.name} - {employee.department}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-blue-600">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {employee.name}
            </h3>
            <p className="text-sm text-gray-600">{employee.email}</p>
            <p className="text-sm text-gray-600 mt-1">{employee.department}</p>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Assets</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {assets.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Active Issues</p>
                  <p className="text-2xl font-bold text-green-600">0</p>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate(`/employees/${id}/report`)}
              className="w-full flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Report Issue
            </Button>
          </div>
        </Card>
      </div>

      <Card title="Assigned Assets">
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
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Serial Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Assigned Date
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
                    {asset.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {asset.serialNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(asset.assignedDate).toLocaleDateString()}
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

export default EmployeeAssetsPage;
