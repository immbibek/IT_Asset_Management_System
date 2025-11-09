import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAssetContext } from "../../context/AssetContext";
import { ArrowLeft } from "lucide-react";
import Card from "../../components/ui/Card";
import AssetForm from "../../components/forms/AssetForm";

const defaultForm = {
  id: "",
  name: "",
  category: "",
  serialNumber: "",
  purchaseDate: "",
  cost: "",
  status: "Available",
};

const EditAssetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assets, updateAsset } = useAssetContext();

  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("=== EDIT PAGE DEBUG ===");
    console.log("1. URL Param ID:", id);
    console.log("2. Assets from Context:", assets);
    console.log("3. UpdateAsset function exists:", typeof updateAsset);

    if (!assets) {
      console.log("4. Assets is null/undefined");
      setError("Assets not loaded");
      setLoading(false);
      return;
    }

    if (assets.length === 0) {
      console.log("4. Assets array is empty");
      setError("No assets available");
      setLoading(false);
      return;
    }

    const asset = assets.find((a) => {
      console.log(`Comparing: "${a.id}" === "${id}"`, a.id === id);
      return a.id === id;
    });

    console.log("5. Found Asset:", asset);

    if (asset) {
      // Ensure all fields have values (no undefined)
      setFormData({
        id: asset.id || "",
        name: asset.name || "",
        category: asset.category || "",
        serialNumber: asset.serialNumber || "",
        purchaseDate: asset.purchaseDate || "",
        cost: asset.cost || "",
        warranty: asset.warranty || "",
        supplier: asset.supplier || "",
        location: asset.location || "",
        description: asset.description || "",
        status: asset.status || "Available",
      });
      setError(null);
    } else {
      setError(`Asset with ID "${id}" not found`);
    }

    setLoading(false);
  }, [id, assets, updateAsset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("=== SUBMITTING UPDATE ===");
    console.log("Form Data:", formData);

    if (typeof updateAsset !== "function") {
      console.error("updateAsset is not a function!");
      alert("Error: Update function not available");
      return;
    }

    try {
      updateAsset(formData);
      console.log("Update successful, navigating back...");
      navigate("/assets");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update asset: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading asset details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/assets")}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to Assets
        </button>
      </div>
    );
  }

  if (!formData.id) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Asset not found.</p>
        <button
          onClick={() => navigate("/assets")}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to Assets
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/assets")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Asset</h1>
          <p className="text-gray-600 mt-1">Editing: {formData.name}</p>
        </div>
      </div>

      <Card>
        <AssetForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText="Update Asset"
        />
      </Card>
    </div>
  );
};

export default EditAssetPage;
