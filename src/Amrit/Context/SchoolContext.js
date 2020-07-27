import React, { createContext, useState, useEffect, useContext } from "react";
import {
  NOT_LOGGED_IN,
  NO_PENDING_VISITS,
  NO_REPORTS,
  appUrl,
} from "../Constants";
import { GlobalStateContext } from "./GlobalStateContext";

export const SchoolContext = createContext();

// Logged in
const schoolidTemp = "iuerhifrehfue";

// Logged out
// const schoolIdTemp = null;

export const SchoolContextProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState(
    "d4bf8383-bc7d-4b38-835d-ab52e744434a"
  );
  const [schoolDetails, setSchoolDetails] = useState(null);

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

  const [labels, setLabels] = useState([]);

  const [latestReport, setLatestReport] = useState(null);
  const [previousReport, setPreviousReport] = useState(null);

  const [latestReportChart, setLatestReportChart] = useState(null);
  const [previousReportChart, setPreviousReportChart] = useState(null);

  const [inAccurateReport, setInAccurateReport] = useState(null);
  // const [remarks, setRemarks] = useState(null);

  useEffect(() => {
    getSchoolReport();
    getGrievances();
    getSchoolDetails();
  }, [schoolId]);

  useEffect(() => {
    if (latestReport) {
      let newPlots = getChartPlots([latestReport]);
      const newRepCopy = [];

      // Setting labels
      const labels = latestReport.reportData.map(
        ({ categoryName }) => categoryName
      ); // Object.keys(getReportsOnly(latestReport));
      if (labels.length > 0) {
        labels.forEach((l) => {
          newRepCopy.push(newPlots[l]);
        });

        setLatestReportChart(newRepCopy);
        setLabels(labels);
      } else {
        setLabels(null);
      }
    }
  }, [latestReport]);

  useEffect(() => {
    if (previousReport) {
      let prevPlots = getChartPlots([previousReport]);
      const prevRepCopy = [];

      // Setting labels
      const labels = latestReport.reportData.map(
        ({ categoryName }) => categoryName
      );
      if (labels.length > 0) {
        labels.forEach((l) => {
          prevRepCopy.push(prevPlots[l]);
        });
        setPreviousReportChart(prevRepCopy);
      }
    }
  }, [previousReport]);

  const getSchoolReport = () => {
    fetch(`${appUrl}/school/plotgraph/${schoolId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((sampleData) => {
        if (sampleData) {
          console.log("sampleData", sampleData);
          if (sampleData) {
            // Sort in descending
            sampleData.sort((a, b) => b.reportDate - a.reportDate);
            setLatestReport(sampleData[0]);
            setPreviousReport(sampleData[1]);

            setInAccurateReport(
              sampleData[0] ? sampleData[0].inaccurateReport : null
            );
          }
        }
      })
      .catch((err) => console.error(err));
  };
  const getSchoolReportOld = () => {
    return new Promise((resolve, reject) => {
      if (!schoolId) {
        return reject(NOT_LOGGED_IN);
      }
      fetch("/sample/school-report.json?schoolId=" + schoolId, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((sampleData) => {
          if (sampleData) {
            // console.log(sampleData);

            const sampleData2 = [
              {
                reportData: [
                  {
                    categoryName: "Library",
                    fieldData: [
                      { question: "q1", answer: "Answer", score: 6, total: 8 },
                      { question: "q2", answer: "Answer", score: 6, total: 8 },
                      { question: "q3", answer: "Answer", score: 6, total: 8 },
                      { question: "q4", answer: "Answer", score: 6, total: 8 },
                    ],
                  },
                  {
                    categoryName: "Mess",
                    fieldData: [
                      { question: "q1", answer: "Answer", score: 7, total: 8 },
                      { question: "q2", answer: "Answer", score: 7, total: 8 },
                      { question: "q3", answer: "Answer", score: 7, total: 8 },
                      { question: "q4", answer: "Answer", score: 7, total: 8 },
                    ],
                  },
                ],
                reportDate: 1595449379918,
                inaccurateReport: {
                  categories: ["Library"],
                  message: "Library is good!",
                },
                remarks: [
                  {
                    categoryName: "Library",
                    message:
                      "Need to improve international author books quality.",
                  },
                ],
              },
              {
                reportData: [
                  {
                    categoryName: "Library",
                    fieldData: [
                      { question: "q1", answer: "Answer", score: 5, total: 8 },
                      { question: "q2", answer: "Answer", score: 5, total: 8 },
                      { question: "q3", answer: "Answer", score: 5, total: 8 },
                      { question: "q4", answer: "Answer", score: 5, total: 8 },
                    ],
                  },
                  {
                    categoryName: "Mess",
                    fieldData: [
                      { question: "q1", answer: "Answer", score: 4, total: 8 },
                      { question: "q2", answer: "Answer", score: 4, total: 8 },
                      { question: "q3", answer: "Answer", score: 4, total: 8 },
                      { question: "q4", answer: "Answer", score: 4, total: 8 },
                    ],
                  },
                ],
                reportDate: 1595339379918,
              },
            ];

            // Sort in descending
            sampleData.sort((a, b) => b.reportDate - a.reportDate);
            setLatestReport(sampleData[0]);
            setPreviousReport(sampleData[1]);

            setInAccurateReport(sampleData[0].inaccurateReport);
          }
        });

      // {
      //   Library: {
      //     q1: { answer: "Answer", score: 5, total: 8 },
      //     q2: { answer: "Answer", score: 5, total: 8 },
      //     q3: { answer: "Answer", score: 5, total: 8 },
      //     q4: { answer: "Answer", score: 5, total: 8 },
      //   },
      //   reportDate: 1595229379918,
      // },
      // console.log(getRawReport(sampleData[0]));
      return resolve();
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

  const { showToast, getChartPlots } = useContext(GlobalStateContext);

  const [grievances, setGrievances] = useState([
    // {
    //   category: "Library",
    //   message: "We need new books out there for good knowledge!",
    //   subject: "Need Books",
    //   date: 1595618220673,
    //   status: "Accepted",
    // },
    // {
    //   category: "Library",
    //   message: "We need more pullingo to join our school!",
    //   subject: "hi",
    //   date: 1595601220673,
    //   status: "Pending",
    // },
  ]);

  const getGrievances = () => {
    fetch(`${appUrl}/school/getallgrievances/${schoolId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setGrievances(res);
        } else {
          setGrievances([]);
        }
      })
      .catch((err) => console.error(err));
  };
  const getGrievancesOld = () => {
    fetch("/sample/school-grievance.json?schoolId=" + schoolId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setGrievances(res);
      })
      .catch((err) => console.error(err));
  };

  const getSchoolDetails = () => {
    // ${latestReport.id}
    fetch(`${appUrl}/school/getdetails/${schoolId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res) {
          setSchoolDetails(res);
        }
      })
      .catch((err) => console.error(err));
  };
  const reportInaccurate = (message, categories, callback) => {
    // ${latestReport.id}
    fetch(`${appUrl}/school/complaint/${latestReport.visitId}`, {
      method: "POST",
      body: JSON.stringify({
        inaccurateReport: {
          message,
          complaintDate: Date.now(),
          categories,
        },
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setInAccurateReport({
            categories,
            message,
          });
          showToast("Reported to DEO successfully!");
          callback();
        }, 200);
      })
      .catch((err) => console.error(err));
  };
  const reportGrievance = (message, subject, callback) => {
    // return;
    fetch(`${appUrl}/school/postgrievance/${schoolId}`, {
      method: "POST",
      body: JSON.stringify({
        message: message,
        subject: subject,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setGrievances((prev) => [
            ...prev,
            {
              message,
              subject,
              date: Date.now(),
              status: "Pending",
              GrievanceId: `${Date.now()}${Math.random()}`,
            },
          ]);
          showToast("Reported to DEO successfully!");
          callback();
        }, 200);
      })
      .catch((err) => console.error(err));
  };
  const reportGrievanceOld = (message, subject, callback) => {
    setTimeout(() => {
      setGrievances((prev) => [
        ...prev,
        { message, subject, date: Date.now(), status: "Pending" },
      ]);
      showToast("Reported to DEO successfully!");
      callback();
    }, 2000);
  };

  return (
    <SchoolContext.Provider
      value={{
        getQrCode,
        getSchoolReport,
        latestReport,
        previousReport,
        getChartPlots,
        inAccurateReport,
        labels,
        setLabels,
        latestReportChart,
        previousReportChart,
        reportInaccurate,
        reportGrievance,
        grievances,
        schoolDetails,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
