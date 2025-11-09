import { useState, useEffect } from "react";

const initialAssets = [
  {
    id: "AST-001",
    name: 'MacBook Pro 16"',
    category: "Laptop",
    serialNumber: "MBP-2023-001",
    purchaseDate: "2023-01-15",
    status: "Available",
    cost: "$2,499",
  },
  {
    id: "AST-002",
    name: 'Dell Monitor 27"',
    category: "Monitor",
    serialNumber: "DEL-MON-789",
    purchaseDate: "2023-02-20",
    status: "Assigned",
    cost: "$399",
  },
  {
    id: "AST-003",
    name: "iPhone 14 Pro",
    category: "Phone",
    serialNumber: "IPH-14P-456",
    purchaseDate: "2023-03-10",
    status: "Available",
    cost: "$1,099",
  },
  {
    id: "AST-004",
    name: "Logitech Mouse MX Master",
    category: "Accessory",
    serialNumber: "LOG-MX3-123",
    purchaseDate: "2023-01-25",
    status: "Assigned",
    cost: "$99",
  },
  {
    id: "AST-005",
    name: "HP Printer LaserJet",
    category: "Printer",
    serialNumber: "HP-LJ-890",
    purchaseDate: "2022-11-05",
    status: "Under Maintenance",
    cost: "$549",
  },
];

// Toggle this to switch between frontend-only and backend mode
const USE_BACKEND = false; // Set to true when backend is ready
const API_URL = "http://localhost:3000/api/assets"; // Your backend URL

const useAssetsData = () => {
  const [assets, setAssets] = useState(() => {
    if (USE_BACKEND) return [];
    
    // Frontend-only mode: use localStorage
    const saved = localStorage.getItem("assets");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved assets:", e);
        return initialAssets;
      }
    }
    return initialAssets;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch assets from backend (only when USE_BACKEND is true)
  useEffect(() => {
    if (USE_BACKEND) {
      fetchAssets();
    }
  }, []);

  // Save to localStorage in frontend-only mode
  useEffect(() => {
    if (!USE_BACKEND) {
      localStorage.setItem("assets", JSON.stringify(assets));
    }
  }, [assets]);

  // Fetch all assets from backend
  const fetchAssets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch assets");
      const data = await response.json();
      setAssets(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching assets:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new asset
  const addAsset = async (newAsset) => {
    if (USE_BACKEND) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAsset),
        });
        if (!response.ok) throw new Error("Failed to add asset");
        const savedAsset = await response.json();
        setAssets((prev) => [...prev, savedAsset]);
        return savedAsset;
      } catch (err) {
        console.error("Error adding asset:", err);
        throw err;
      }
    } else {
      // Frontend-only mode
      setAssets((prev) => [...prev, newAsset]);
      return newAsset;
    }
  };

  // ✅ Update existing asset
  const updateAsset = async (updatedAsset) => {
    if (USE_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/${updatedAsset.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAsset),
        });
        if (!response.ok) throw new Error("Failed to update asset");
        const updated = await response.json();
        setAssets((prev) =>
          prev.map((asset) => (asset.id === updated.id ? updated : asset))
        );
        return updated;
      } catch (err) {
        console.error("Error updating asset:", err);
        throw err;
      }
    } else {
      // Frontend-only mode
      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === updatedAsset.id ? updatedAsset : asset
        )
      );
      return updatedAsset;
    }
  };

  // ✅ Delete asset by id
  const deleteAsset = async (id) => {
    if (USE_BACKEND) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete asset");
        setAssets((prev) => prev.filter((asset) => asset.id !== id));
      } catch (err) {
        console.error("Error deleting asset:", err);
        throw err;
      }
    } else {
      // Frontend-only mode
      setAssets((prev) => prev.filter((asset) => asset.id !== id));
    }
  };

  // ✅ Reset to initial data (useful for testing)
  const resetAssets = () => {
    if (!USE_BACKEND) {
      setAssets(initialAssets);
      localStorage.setItem("assets", JSON.stringify(initialAssets));
    }
  };

  return {
    assets,
    loading,
    error,
    addAsset,
    updateAsset,
    deleteAsset,
    resetAssets,
    refreshAssets: USE_BACKEND ? fetchAssets : () => {},
  };
};

export default useAssetsData;