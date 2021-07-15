import React, { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isDEO, setIsDEO] = React.useState(false);

  return (
    <AuthContext.Provider
      value={{
        isDEO,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
