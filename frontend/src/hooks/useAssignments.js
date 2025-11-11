import { useState, useEffect, useMemo } from "react";
import axios from "axios"; // Import axios
import { useAssetContext } from "../context/AssetContext";
import { useEmployeeContext } from "../context/EmployeeContext";

const useAssignments = () => {
  const { assets, updateAsset } = useAssetContext();
  const { employees, loading: employeesLoading, error: employeesError } = useEmployeeContext(); // Get loading and error from context

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(true);
  const [assignmentsError, setAssignmentsError] = useState(null);

  const API_URL = "http://localhost:5000/api/assignments";

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(API_URL);
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setAssignmentsError(error);
      } finally {
        setAssignmentsLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter(
      (asset) =>
        asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, assets]);

  const openAssignModal = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleAssign = async () => {
    if (!selectedEmployee || !selectedAsset) return;

    try {
      const response = await axios.post(API_URL, {
        asset: selectedAsset._id, // Use backend '_id' for asset
        employee: selectedEmployee, // selectedEmployee is already backend '_id' from EmployeeContext
      });
      setAssignments([...assignments, response.data]);

      updateAsset({
        ...selectedAsset,
        status: "Assigned",
        assignedTo: employees.find((e) => e.id === selectedEmployee)?.name,
      });

      closeModal();
    } catch (error) {
      console.error("Error assigning asset:", error);
      // Handle error
    }
  };

  const handleUnassign = async (assetId) => {
    try {
      const assignmentToUnassign = assignments.find(
        (assignment) => assignment.asset._id === assetId && !assignment.returnDate
      );

      if (!assignmentToUnassign) {
        console.error("No active assignment found for this asset.");
        return;
      }

      const response = await axios.put(`${API_URL}/${assignmentToUnassign._id}/unassign`);

      setAssignments(
        assignments.map((assignment) =>
          assignment._id === response.data._id ? response.data : assignment
        )
      );

      updateAsset({ ...assets.find(a => a._id === assetId), status: "Available", assignedTo: null });
    } catch (error) {
      console.error("Error unassigning asset:", error);
      // Handle error
    }
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
    assignments, // Expose assignments
  };
};

export default useAssignments;
