import React, { useState } from "react";
import Card from "../../components/ui/Card";

const AddAssetPage = () => {
  const [formData, setFormData] = useState({
    assetName: "",
    category: "",
    serialNumber: "",
    purchaseDate: "",
    vendor: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For Now: Just log the data
    console.log("New Asset Added:", formData);

    // Later this will call backend:
    // await axios.post("/api/assets", formData);

    alert("Asset added successfully!");
  };

  return (
    <div className="p-6">
      <Card title="Add New Asset" className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Asset Name</label>
            <input
              type="text"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select Category</option>
              <option value="Laptop">Laptop</option>
              <option value="Monitor">Monitor</option>
              <option value="Keyboard">Keyboard</option>
              <option value="Mouse">Mouse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Vendor</label>
            <input
              type="text"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Under Repair">Under Repair</option>
              <option value="Disposed">Disposed</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Asset
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddAssetPage;
