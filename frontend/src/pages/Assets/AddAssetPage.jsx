import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import AssetForm from "../../components/assets/AssetForm";
import useAssetsData from "../../hooks/useAssetsData";

const AddAssetPage = () => {
  const navigate = useNavigate();
  const { addAsset } = useAssetsData();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    serialNumber: "",
    purchaseDate: "",
    cost: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("=== ADD ASSET DEBUG ===");
    console.log("Form Data:", formData);

    // Generate unique ID
    const newAsset = {
      ...formData,
      id: `AST-${String(Date.now()).slice(-3).padStart(3, "0")}`,
    };

    console.log("New Asset with ID:", newAsset);

    try {
      await addAsset(newAsset);
      console.log("Asset added successfully!");
      navigate("/assets");
    } catch (error) {
      console.error("Failed to add asset:", error);
      alert("Failed to add asset: " + error.message);
    }
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
