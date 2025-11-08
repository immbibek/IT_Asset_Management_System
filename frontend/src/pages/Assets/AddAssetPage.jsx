import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import AssetForm from "../../components/assets/AssetForm";

const AddAssetPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    serialNumber: "",
    purchaseDate: "",
    cost: "",
    warranty: "",
    supplier: "",
    location: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Asset Submitted:", formData);
    navigate("/assets");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/assets")}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Add New Asset</h1>
          <p className="text-gray-600 mt-1">Enter asset details</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AssetForm formData={formData} handleChange={handleChange} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Additional details about the asset..."
            />
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="primary">
              Add Asset
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/assets")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddAssetPage;
