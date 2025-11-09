import { useState, useMemo } from "react";
import { useAssetContext } from "../context/AssetContext";
import { useEmployeeContext } from "../context/EmployeeContext";

const useAssignments = () => {
  const { assets, updateAsset } = useAssetContext();
  const { employees } = useEmployeeContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter assets by name or ID
  const filteredAssets = useMemo(() => {
    return assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, assets]);

  // Open Assign Modal
  const openAssignModal = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  // Assign Asset
  const handleAssign = () => {
    if (!selectedEmployee || !selectedAsset) return;

    // Find employee object
    const employee = employees.find((e) => e.id === selectedEmployee);
    if (!employee) return;

    // Update the selected asset
    updateAsset({
      ...selectedAsset,
      status: "Assigned",
      assignedTo: employee.name,
    });

    closeModal();
  };

  // Unassign Asset
  const handleUnassign = (asset) => {
    updateAsset({ ...asset, status: "Available", assignedTo: null });
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
    setSelectedEmployee("");
  };

  return {
    employees,
    filteredAssets,
    isModalOpen,
    selectedAsset,
    selectedEmployee,
    openAssignModal,
    setSelectedEmployee,
    handleAssign,
    handleUnassign,
    closeModal,
    searchTerm,
    setSearchTerm,
  };
};

export default useAssignments;