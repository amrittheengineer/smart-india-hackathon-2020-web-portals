import React, { createContext, useState, useEffect, useContext } from "react";
import { NOT_LOGGED_IN, NO_PENDING_VISITS, NO_REPORTS } from "../Constants";
import { GlobalStateContext } from "./GlobalStateContext";

export const SchoolContext = createContext();

// Logged in
const schoolidTemp = "iuerhifrehfue";

// Logged out
// const school.idTemp = null;

export const SchoolContextProvider = ({ children }) => {
  const [school, setschool] = useState({
    id: "vegrygue-irg-434jhveb",
    name: "VRS School",
    mId: "ciue2933-vrtgu3-5",
    deoId: "iceurfh-4985j-3fve",
  });

  const getQrCode = () => {
    return new Promise((resolve, reject) => {
      if (!school.id) {
        return reject(NOT_LOGGED_IN);
      }
      fetch("/sample/school-qr-code.json?school.id=" + school.id, {
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
  }, [school.id]);

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
    return new Promise((resolve, reject) => {
      if (!school.id) {
        return reject(NOT_LOGGED_IN);
      }
      fetch("/sample/school-report.json?school.id=" + school.id, {
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
      fetch("/sample/school-qr-code.json?school.id=" + school.id, {
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
    fetch("/sample/school-grievance.json?school.id=" + school.id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setGrievances(res);
      })
      .catch((err) => console.error(err));
  };

  const reportInaccurate = (message, categories, callback) => {
    setTimeout(() => {
      setInAccurateReport({
        categories,
        message,
      });
      showToast("Reported to DEO successfully!");
      callback();
    }, 2000);
  };

  const reportGrievance = (category, message, subject, callback) => {
    setTimeout(() => {
      setGrievances((prev) => [
        ...prev,
        { category, message, subject, date: Date.now(), status: "Pending" },
      ]);
      showToast("Reported to DEO successfully!");
      callback();
    }, 2000);
  };

  return (
    <SchoolContext.Provider
      value={{
        school,
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
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
