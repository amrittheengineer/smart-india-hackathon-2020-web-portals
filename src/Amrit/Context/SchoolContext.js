import React, { createContext, useState } from "react";
import { NOT_LOGGED_IN, NO_PENDING_VISITS, NO_REPORTS } from "../Constants";

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
      fetch("/sample/school-qr-code.json?schoolId=" + schoolId, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.pendingVisit) {
            reject(NO_PENDING_VISITS);
          } else {
            resolve(res.visit);
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  const getSchoolReport = () => {
    return new Promise((resolve, reject) => {
      if (!schoolId) {
        return reject(NOT_LOGGED_IN);
      }
      return resolve([
        { Library: { q1: 5, q2: 6, q3: 2, q4: 9 }, reportDate: 1595449379918 },
        {
          Library: { q1: 15, q2: 26, q3: 22, q4: 14 },
          reportDate: 1595339379918,
        },
        {
          Library: { q1: 13, q2: 56, q3: 72, q4: 54 },
          reportDate: 1595229379918,
        },
      ]);
      fetch("/sample/school-qr-code.json?schoolId=" + schoolId, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.pendingVisit) {
            reject(NO_REPORTS);
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  return (
    <SchoolContext.Provider value={{ schoolId, getQrCode, getSchoolReport }}>
      {children}
    </SchoolContext.Provider>
  );
};
