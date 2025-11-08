import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
    setUser("");
    setPass("");
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        pass,
        isAuthenticated,
        setUser,
        setPass,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
