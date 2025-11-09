import { createContext, useContext, useState, useEffect } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // TEMPORARY: mock data (replace with backend later)
    setEmployees([
      { id: "EMP-001", name: "John Doe", department: "Engineering" },
      { id: "EMP-002", name: "Jane Smith", department: "Design" },
      { id: "EMP-003", name: "Mike Johnson", department: "Marketing" },
      { id: "EMP-004", name: "Sarah Williams", department: "Sales" },
    ]);
  }, []);

  /* BACKEND INTEGRATION SPOT
  -------------------------------------
  When backend is ready:
  useEffect(() => {
    fetch("/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);
  -------------------------------------
  */

  return (
    <EmployeeContext.Provider value={{ employees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
