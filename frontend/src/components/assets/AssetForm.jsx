import React from "react";

const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

const AssetForm = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Asset Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Asset Name
        </label>
        <input
          type="text"
          name="assetName"
          value={formData.assetName}
          onChange={handleChange}
          className={inputClass}
          placeholder="MacBook Pro 16"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={inputClass}
          required
        >
          <option value="">Select Category</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
          <option value="Monitor">Monitor</option>
          <option value="Phone">Phone</option>
          <option value="Tablet">Tablet</option>
          <option value="Accessory">Accessory</option>
          <option value="Printer">Printer</option>
          <option value="Network">Network Equipment</option>
        </select>
      </div>

      {/* Serial Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Serial Number
        </label>
        <input
          type="text"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          className={inputClass}
          placeholder="MBP-2023-001"
          required
        />
      </div>

      {/* Purchase Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Purchase Date
        </label>
        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      {/* Cost */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Purchase Cost
        </label>
        <input
          type="text"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          className={inputClass}
          placeholder="2500.00"
          required
        />
      </div>

      {/* Warranty */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Warranty Period (Months)
        </label>
        <input
          type="number"
          name="warranty"
          value={formData.warranty}
          onChange={handleChange}
          className={inputClass}
          placeholder="24"
          required
        />
      </div>

      {/* Supplier */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Supplier
        </label>
        <input
          type="text"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          className={inputClass}
          placeholder="Apple Store"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={inputClass}
          placeholder="HQ - Floor 3"
          required
        />
      </div>
      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={inputClass}
          required
        >
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Under Maintenance">Under Maintenance</option>
          <option value="Retired">Retired</option>
        </select>
      </div>
    </div>
  );
};

export default AssetForm;
