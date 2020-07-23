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

  const getChartPlots = (reportArray) => {
    let aggregateData = {};
    reportArray.forEach(({ reportDate, ...report }) => {
      Object.keys(report).map((r) => {
        const reportValues = report[r];
        if (!aggregateData[r]) {
          aggregateData[r] = [];
        }
        aggregateData[r].push(
          reportValues.reduce((old, { score, total }) => {
            return old + (score / total) * 100;
          }, 0) / reportValues.length
        );
      });
    });
    const parameters = Object.keys(aggregateData);
    parameters.forEach((p) => {
      aggregateData[p] =
        aggregateData[p].reduce((old, current) => {
          return old + current;
        }, 0) / aggregateData[p].length;
    });
    return aggregateData;
  };

  const getRawReport = (reportParam) => {
    let aggregateData = {};
    const { reportDate, ...report } = reportParam;
    Object.keys(report).map((entity) => {
      if (!aggregateData[entity]) {
        aggregateData[entity] = [];
      }

      report[entity].forEach(({ question, answer }) =>
        aggregateData[entity].push({
          question,
          answer,
        })
      );
    });
    // const parameters = Object.keys(aggregateData);
    // parameters.forEach((p) => {
    //   aggregateData[p] =
    //     aggregateData[p].reduce((old, current) => {
    //       return old + current;
    //     }, 0) / aggregateData[p].length;
    // });
    return aggregateData;
  };

  const getSchoolReport = () => {
    return new Promise((resolve, reject) => {
      if (!schoolId) {
        return reject(NOT_LOGGED_IN);
      }
      const sampleData = [
        {
          Library: [
            { question: "q1", answer: "Answer", score: 5, total: 8 },
            { question: "q2", answer: "Answer", score: 5, total: 8 },
            { question: "q3", answer: "Answer", score: 5, total: 8 },
            { question: "q4", answer: "Answer", score: 5, total: 8 },
          ],
          reportDate: 1595449379918,
        },
        {
          Library: [
            { question: "q1", answer: "Answer", score: 5, total: 8 },
            { question: "q2", answer: "Answer", score: 5, total: 8 },
            { question: "q3", answer: "Answer", score: 5, total: 8 },
            { question: "q4", answer: "Answer", score: 5, total: 8 },
          ],
          Mess: [
            { question: "q1", answer: "Answer", score: 5, total: 8 },
            { question: "q2", answer: "Answer", score: 5, total: 8 },
            { question: "q3", answer: "Answer", score: 5, total: 8 },
            { question: "q4", answer: "Answer", score: 5, total: 8 },
          ],
          reportDate: 1595339379918,
        },
      ];
      // {
      //   Library: {
      //     q1: { answer: "Answer", score: 5, total: 8 },
      //     q2: { answer: "Answer", score: 5, total: 8 },
      //     q3: { answer: "Answer", score: 5, total: 8 },
      //     q4: { answer: "Answer", score: 5, total: 8 },
      //   },
      //   reportDate: 1595229379918,
      // },
      console.log(getRawReport(sampleData[0]));
      return resolve(sampleData);
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
