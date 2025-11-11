import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import axios from "axios";

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
      });
      // Optionally navigate back to employees page after a short delay
      setTimeout(() => {
        navigate("/employees");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add employee");
      console.error("Error adding employee:", err);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-800">Add New Employee</h1>
          <p className="text-gray-600 mt-1">
            Fill in the details to add a new employee to the system
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Engineering, Marketing"
              />
            </div>

            {loading && <p className="text-blue-600">Adding employee...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {success && (
              <p className="text-green-600">Employee added successfully!</p>
            )}

            <div className="flex items-center gap-3">
              <Button type="submit" variant="primary" disabled={loading}>
                Add Employee
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/employees")}
                disabled={loading}
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

export default AddEmployeePage;
