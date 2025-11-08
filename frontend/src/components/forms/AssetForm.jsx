// src/components/forms/AssetForm.jsx
import React from "react";

const AssetForm = ({ formData, onChange, onSubmit, submitText }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Asset Name", name: "name", type: "text" },
          { label: "Serial Number", name: "serialNumber", type: "text" },
          { label: "Purchase Date", name: "purchaseDate", type: "date" },
          { label: "Purchase Cost", name: "cost", type: "text" },
          {
            label: "Warranty Period (Months)",
            name: "warranty",
            type: "number",
          },
          { label: "Supplier", name: "supplier", type: "text" },
          { label: "Location", name: "location", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option>Laptop</option>
            <option>Desktop</option>
            <option>Monitor</option>
            <option>Phone</option>
            <option>Tablet</option>
            <option>Accessory</option>
            <option>Printer</option>
            <option>Network Equipment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option>Available</option>
            <option>Assigned</option>
            <option>Under Maintenance</option>
            <option>Retired</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {submitText}
      </button>
    </form>
  );
};

export default AssetForm;
