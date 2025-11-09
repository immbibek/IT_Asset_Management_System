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

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, assets]);

  const openAssignModal = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleAssign = () => {
    if (!selectedEmployee) return;

    updateAsset({
      ...selectedAsset,
      status: "Assigned",
      assignedTo: selectedEmployee,
    });

    /* BACKEND INTEGRATION SPOT
    --------------------------------------
    Replace `updateAsset` with API call later:
    await axios.put(`/api/assets/${selectedAsset.id}/assign`, {
      employeeId: selectedEmployee
    });
    Then refetch assets.
    --------------------------------------
    */

    closeModal();
  };

  const handleUnassign = (asset) => {
    updateAsset({ ...asset, status: "Available", assignedTo: null });

    /* BACKEND INTEGRATION SPOT
    --------------------------------------
    await axios.put(`/api/assets/${asset.id}/unassign`);
    Then refetch assets.
    --------------------------------------
    */
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
    setSelectedEmployee("");
  };

  return {
    employees,
    filteredAssets,
    isModalOpen,
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
