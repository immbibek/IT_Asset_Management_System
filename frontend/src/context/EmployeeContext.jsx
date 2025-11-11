import { createContext, useContext, useState, useEffect } from "react";
import employeeService from "../services/employeeService"; // Import the new service

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getEmployees();
        setEmployees(
          data.map((user) => ({
            ...user,
            id: user._id, // Map backend '_id' to frontend 'id'
            name: user.name,
            department: user.department || "N/A",
          }))
        );
      } catch (err) {
        setError(err);
        console.error("Error fetching employees in context:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, loading, error }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
