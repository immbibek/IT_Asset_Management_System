// src/pages/Assets/EditAssetPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useAssetsData from "../../hooks/useAssetsData";
import { getAssetById, updateAsset } from "../../services/assetService";
import Card from "../../components/ui/Card";
import AssetForm from "../../components/forms/AssetForm";

const EditAssetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assets } = useAssetsData();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const asset = getAssetById(id, assets);
    if (asset) setFormData(asset);
  }, [id, assets]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAsset(formData);
    navigate("/assets");
  };

  if (!formData)
    return <p className="text-gray-600">Loading asset details...</p>;

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
          <p className="text-gray-600 mt-1">
            Update asset details - {formData.name}
          </p>
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
