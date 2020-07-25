import React, { createContext, useState, useEffect, useContext } from "react";
import { NOT_LOGGED_IN, NO_PENDING_VISITS, NO_REPORTS } from "../Constants";
import { GlobalStateContext } from "./GlobalStateContext";

export const DEOContext = createContext();

// Logged in
const schoolidTemp = "iuerhifrehfue";

// Logged out
// const DEO.idTemp = null;

export const DEOContextProvider = ({ children }) => {
  const [DEO, setDEO] = useState({
    id: "vegrygue-irg-434jhveb",
    name: "VRS School",
  });

  const getQrCode = () => {
    return new Promise((resolve, reject) => {
      if (!DEO.id) {
        return reject(NOT_LOGGED_IN);
      }
      fetch("/sample/school-qr-code.json?DEO.id=" + DEO.id, {
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
    reportArray.forEach(({ reportData }) => {
      reportData.map(({ categoryName, fieldData }) => {
        if (!aggregateData[categoryName]) {
          aggregateData[categoryName] = [];
        }
        aggregateData[categoryName].push(
          // fieldData.reduce((old, { score, total }) => {
          //   return old + (score / total) * 100;
          // }, 0) / fieldData.length
          (fieldData.reduce((old, { score }) => {
            return old + score;
          }, 0) /
            fieldData.reduce((old, { total }) => {
              return old + total;
            }, 0)) *
            100
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

  const [labels, setLabels] = useState([]);
  const [visitList, setVisitList] = useState(null);

  const [latestReport, setLatestReport] = useState(null);
  const [previousReport, setPreviousReport] = useState(null);

  const [latestReportChart, setLatestReportChart] = useState(null);
  const [previousReportChart, setPreviousReportChart] = useState(null);

  const [inAccurateReport, setInAccurateReport] = useState(null);

  const [school, setSchool] = useState(
    null
    //   {
    //   id: "vegrygue-irg-434jhveb",
    //   name: "VRS School",
    //   mId: "ciue2933-vrtgu3-5",
    //   deoId: DEO.id,
    // }
  );

  useEffect(() => {
    setLatestReportChart(null);
    setPreviousReport(null);
    if (school && school.id) {
      getSchoolReport(school.id);
    }
  }, [school]);

  // const [remarks, setRemarks] = useState(null);

  useEffect(() => {
    getMEOList();
    getSchoolList();
    getGrievances();
    getVisitsList();
  }, [DEO.id]);

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

  const getSchoolReport = (schoolIdParam) => {
    return new Promise((resolve, reject) => {
      if (!schoolIdParam) {
        return reject(NOT_LOGGED_IN);
      }
      fetch("/sample/school-report.json?DEO.id=" + schoolIdParam, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((sampleData) => {
          if (sampleData) {
            // console.log(sampleData);

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
      fetch("/sample/school-qr-code.json?DEO.id=" + DEO.id, {
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

  const { showToast } = useContext(GlobalStateContext);

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

  const [MEOList, setMEOList] = useState([]);
  const [schoolList, setSchoolList] = useState([]);

  const schoolId = "iwje0-3843u94-43j";
  const meoId = "feur-4934-fcieru2";

  const calculateReportData = (reportData) => getChartPlots(reportData);

  const getSchoolList = () => {
    setTimeout(() => {
      setSchoolList([
        {
          schoolId: schoolId,
          deoId: DEO.id,
          name: "Master Matriculation School",
          lastVisited: Date.now(),
          mId: meoId,
        },
      ]);
    }, 2000);
  };

  const getVisitsList = () => {
    setTimeout(() => {
      setVisitList([
        {
          reportData: [
            {
              categoryName: "Library",
              fieldData: [
                {
                  question: "q1",
                  answer: "Answer",
                  score: 6,
                  total: 8,
                },
                {
                  question: "q2",
                  answer: "Answer",
                  score: 6,
                  total: 8,
                },
                {
                  question: "q3",
                  answer: "Answer",
                  score: 6,
                  total: 8,
                },
                {
                  question: "q4",
                  answer: "Answer",
                  score: 6,
                  total: 8,
                },
              ],
            },
            {
              categoryName: "Mess",
              fieldData: [
                {
                  question: "q1",
                  answer: "Answer",
                  score: 7,
                  total: 8,
                },
                {
                  question: "q2",
                  answer: "Answer",
                  score: 7,
                  total: 8,
                },
                {
                  question: "q3",
                  answer: "Answer",
                  score: 7,
                  total: 8,
                },
                {
                  question: "q4",
                  answer: "Answer",
                  score: 7,
                  total: 8,
                },
              ],
            },
          ],
          reportDate: 1595449379918,
          remarks: [
            {
              categoryName: "Library",
              message: "Need to improve international author books quality.",
            },
          ],
          schoolId: schoolId,
          mId: meoId,
          visitId: "coeifi-firejf-iufer1",
        },
        {
          reportDate: 1555449379918,
          schoolId: schoolId,
          mId: meoId,
          visitId: "coeifi-firejf-iufer2",
        },
        {
          reportData: [
            {
              categoryName: "Library",
              fieldData: [
                {
                  question: "q1",
                  answer: "Answer",
                  score: 6,
                  total: 8,
                },
                {
                  question: "q2",
                  answer: "Answer",
                  score: 6,
                  total: 8,
                },
                {
                  question: "q3",
                  answer: "Answer",
                  score: 6,
                  total: 8,
                },
                {
                  question: "q4",
                  answer: "Answer",
                  score: 6,
                  total: 8,
                },
              ],
            },
            {
              categoryName: "Mess",
              fieldData: [
                {
                  question: "q1",
                  answer: "Answer",
                  score: 7,
                  total: 8,
                },
                {
                  question: "q2",
                  answer: "Answer",
                  score: 7,
                  total: 8,
                },
                {
                  question: "q3",
                  answer: "Answer",
                  score: 7,
                  total: 8,
                },
                {
                  question: "q4",
                  answer: "Answer",
                  score: 7,
                  total: 8,
                },
              ],
            },
          ],
          reportDate: 1534449379918,
          remarks: [
            {
              categoryName: "Library",
              message: "Need to improve international author books quality.",
            },
          ],
          schoolId: schoolId,
          mId: meoId,
          visitId: "coeifi-firejf-iufer3",
          inaccurateReport: {
            categories: ["Library"],
            message: "This is inaccurate",
            complaintDate: 1539849379918,
          },
        },
      ]);
    }, 3000);
  };
  const getMEOList = () => {
    setTimeout(() => {
      setMEOList([
        {
          deoId: DEO.id,
          mId: "feur-4934-fcieru1",
          schoolsCount: 2,
          zoneName: "Area 1",
          name: "Mr. Bala Krishnan",
        },
        {
          deoId: DEO.id,
          mId: meoId,
          schoolsCount: 1,
          zoneName: "Area 2",
          name: "Mr. Joseph Kuruvilla",
        },
      ]);
    }, 1000);
  };

  const getSchoolName = (schoolIdParam) => {
    const schoolData = schoolList.find((s) => s.schoolId === schoolIdParam);
    return schoolData ? schoolData.name : null;
  };
  const getMEOName = (meoIdParam) => {
    const meoData = MEOList.find((s) => s.mId === meoIdParam);
    return meoData ? meoData.name : null;
  };

  const getGrievances = () => {
    setTimeout(() => {
      setGrievances([
        {
          category: "Library",
          message: "We need new books out there for good knowledge!",
          subject: "Need Books",
          date: 1595618220673,
          status: "Accepted",
          schoolId: schoolId,
        },
        {
          category: "Library",
          message: "We need more pullingo to join our school!",
          subject: "hi",
          date: 1595601220673,
          status: "Pending",
          schoolId: schoolId,
        },
      ]);
    }, 2000);
  };

  return (
    <DEOContext.Provider
      value={{
        DEO,
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
        grievances,
        MEOList,
        schoolList,
        getSchoolName,
        visitList,
        getMEOName,
        calculateReportData,
      }}
    >
      {children}
    </DEOContext.Provider>
  );
};
