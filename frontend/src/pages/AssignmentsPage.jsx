import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { Search } from "lucide-react";
import AssignmentsTable from "../components/assignments/AssignmentsTable";
import useAssignments from "../hooks/useAssignments";

const AssignmentsPage = () => {
  const {
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
    assignments, // Get assignments from the hook
  } = useAssignments();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Asset Assignments</h1>

      <Card>
        <div className="relative mb-4">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <AssignmentsTable
          assets={filteredAssets}
          assignments={assignments} // Pass assignments to the table
          onAssign={openAssignModal}
          onUnassign={handleUnassign}
        />
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Assign Asset">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="">Choose Employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}> {/* Use frontend 'id' for employee */}
              {e.name} ({e.department})
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAssign}>
            Assign
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AssignmentsPage;
