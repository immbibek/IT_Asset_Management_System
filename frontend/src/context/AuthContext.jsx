import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in

  const login = (role) => {
    // later replace with API
    setUser({
      name: role === "admin" ? "Admin User" : "Employee User",
      role: role === "admin" ? "Administrator" : "Employee",
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
