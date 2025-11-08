import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAssetsData from "../../hooks/useAssetsData";

const EditAssetPage = () => {
  const { id } = useParams(); // get asset id from URL
  const navigate = useNavigate();
  const { assets } = useAssetsData(); // get all assets

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "",
    assignedTo: "",
  });

  // Load asset data into form when page opens
  useEffect(() => {
    const assetToEdit = assets.find((asset) => asset.id === id);
    if (assetToEdit) {
      setFormData({
        name: assetToEdit.name || "",
        category: assetToEdit.category || "",
        status: assetToEdit.status || "",
        assignedTo: assetToEdit.assignedTo || "",
      });
    }
  }, [id, assets]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // For now just console (later → API PUT request)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Asset:", formData);
    navigate("/assets"); // redirect after save
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Asset</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          name="name"
          className="border p-2 w-full rounded"
          placeholder="Asset Name"
          value={formData.name}
          onChange={handleChange}
        />

        <select
          name="category"
          className="border p-2 w-full rounded"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          <option value="Laptop">Laptop</option>
          <option value="Monitor">Monitor</option>
          <option value="Software">Software</option>
        </select>

        <select
          name="status"
          className="border p-2 w-full rounded"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Select status</option>
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Under Repair">Under Repair</option>
        </select>

        <input
          type="text"
          name="assignedTo"
          className="border p-2 w-full rounded"
          placeholder="Assigned To"
          value={formData.assignedTo}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAssetPage;
