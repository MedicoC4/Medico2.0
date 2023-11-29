import React, { createContext, useState, useContext } from "react";

const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const updateUserData = (newData) => {
    setUserData(newData);
    localStorage.setItem("userData", JSON.stringify(newData));
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export { UserDataProvider, useUserData };
