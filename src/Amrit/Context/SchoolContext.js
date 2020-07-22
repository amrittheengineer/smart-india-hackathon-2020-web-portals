import React, { createContext, useState } from "react";
import { NOT_LOGGED_IN, NO_PENDING_VISITS } from "../Constants";

export const SchoolContext = createContext();

// Logged in
const schoolIdTemp = "iuerhifrehfue";

// Logged out
// const schoolIdTemp = null;

export const SchoolContextProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState(schoolIdTemp);

  const getQrCode = () => {
    return new Promise((resolve, reject) => {
      if (!schoolId) {
        return reject(NOT_LOGGED_IN);
      }
      fetch("/sample/school-qr-code.json", { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          if (!res.pendingVisit) {
            reject(NO_PENDING_VISITS);
          } else {
            resolve(res.visit);
          }
        });
    });
  };

  return (
    <SchoolContext.Provider value={{ schoolId, getQrCode }}>
      {children}
    </SchoolContext.Provider>
  );
};
