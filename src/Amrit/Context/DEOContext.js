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

  const { getChartPlots } = useContext(GlobalStateContext);

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
  const [visitId, setVisitId] = useState(null);

  useEffect(() => {
    setLatestReport(null);
    setPreviousReport(null);
    if (school && school.id) {
      getSchoolReport(school.id);
    }
  }, [school]);

  useEffect(() => {
    setPreviousReport(null);
    setLatestReport(null);
    if (visitId && visitList) {
      const report = visitList.find((d) => d.visitId === visitId);
      console.log(report);
      setLatestReport(report);
    }
  }, [visitId, visitList]);

  const getVisitDataReportOf = (id) => {
    if (id && visitList) {
      const report = visitList.find((d) => d.visitId === id);
      return report.reportData;
    }
    return null;
  };

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
    } else {
      setLatestReportChart(null);
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
    } else {
      setPreviousReportChart(null);
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
      //     q1: {  answer: "4", qType: 0 },
      //     q2: {  answer: "4", qType: 0 },
      //     q3: {  answer: "4", qType: 0 },
      //     q4: {  answer: "4", qType: 0 },
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

  const [grievances, setGrievances] = useState(
    null
    // [
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
    // ]
  );

  const [MEOList, setMEOList] = useState(null);
  const [schoolList, setSchoolList] = useState(null);

  const schoolId = "iwje0-3843u94-43j";
  const meoId = "feur-4934-fcieru2";

  const calculateReportData = (reportData) => getChartPlots(reportData);

  const scheduleVisit = (schoolId, mId, reportDate, callback) => {
    setTimeout(() => {
      setVisitList((prev) => [...prev, { reportDate, mId, schoolId }]);
      showToast(`Visit Scheduled successfully!`);
      callback();
    }, 2000);
  };

  const getSchoolList = () => {
    setTimeout(() => {
      setSchoolList([
        // {
        //   schoolId: schoolId,
        //   deoId: DEO.id,
        //   schoolName: "Master Matriculation School",
        //   lastVisited: 1545714572110,
        //   mId: meoId,
        // },
        {
          lastVisited: 1545789572110,
          schoolId: "b4b50e26-593e-4169-ae70-406b05407223",
          schoolName: "CIT Matric Hr.Sec.School",
          mandalName: "Kundrathur",
          schoolAdress: "Sarathy Nagar, Kundrathur,Chennai.",
          geoHash: "tf2cyvb8yj3p",
          mId: "99adc5c4-d25b-430d-9b77-f0e9b9f4dd3cf",
          dId: "06da6e93-cd10-4780-b67b-8e0613703ae9",
        },
        {
          lastVisited: 1595289572110,
          schoolId: "14b50e26-593e-4169-ae70-406b05407223",
          schoolName: "Master Matric Hr.Sec.School",
          mandalName: "Kundrathur",
          schoolAdress: "Sairam Nagar, Kundrathur,Chennai.",
          geoHash: "tf34dgr1ytsp",
          mId: "99adc5c4-d25b-430d-9b77-f0e9b9f4dd3cr",
          dId: "06da6e93-cd10-4780-b67b-8e0613703ae9",
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
                  question: "What is the procedure to change the room, sir?",

                  answer: "4",
                  qType: 1,
                },
                {
                  question: "What is the procedure to change the book, sir?",

                  answer: "4",
                  qType: 1,
                },
                {
                  question: "q3",

                  answer: "4",
                  qType: 0,
                },
                {
                  question: "What is the procedure to change the school, sir?",

                  answer: "4",
                  qType: 1,
                },
              ],
            },
            {
              categoryName: "Mess",
              fieldData: [
                {
                  question: "q1",

                  answer: "3",
                  qType: 0,
                },
                {
                  question: "What is the procedure to change the food, sir?",

                  answer: "5",
                  qType: 1,
                },
                {
                  question: "q3",

                  answer: "5",
                  qType: 0,
                },
                {
                  question: "q4",

                  answer: "1",
                  qType: 0,
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

                  answer: "4",
                  qType: 0,
                },
                {
                  question: "q2",

                  answer: "4",
                  qType: 0,
                },
                {
                  question: "q3",

                  answer: "4",
                  qType: 0,
                },
                {
                  question: "q4",

                  answer: "4",
                  qType: 0,
                },
              ],
            },
            {
              categoryName: "Mess",
              fieldData: [
                {
                  question: "q1",

                  answer: "4",
                  qType: 0,
                },
                {
                  question: "q2",

                  answer: "4",
                  qType: 0,
                },
                {
                  question: "q3",

                  answer: "4",
                  qType: 0,
                },
                {
                  question: "q4",

                  answer: "4",
                  qType: 0,
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
      setMEOList(
        //   [
        //   {
        //     deoId: DEO.id,
        //     mId: "feur-4934-fcieru1",
        //     schoolsCount: 2,
        //     zoneName: "Area 1",
        //     name: "Mr. Bala Krishnan",
        //   },
        //   {
        //     deoId: DEO.id,
        //     mId: meoId,
        //     schoolsCount: 1,
        //     zoneName: "Area 2",
        //     name: "Mr. Joseph Kuruvilla",
        //   },
        // ]
        [
          {
            name: "Joseph Kuruvilla",
            mId: "99adc5c4-d25b-430d-9b77-f0e9b9f4dd3c",
            dId: "06da6e93-cd10-4780-b67b-8e0613703ae9",
            mandalName: "Kundrathur",
          },
          {
            name: "Annie",
            mId: "50ed655a-01ec-4bd4-96d8-c9dae67c180d",
            dId: "06da6e93-cd10-4780-b67b-8e0613703ae9",
            mandalName: "Royapuram",
          },
        ]
      );
    }, 1000);
  };

  const getSchoolName = (schoolIdParam) => {
    const schoolData = schoolList.find((s) => s.schoolId === schoolIdParam);
    return schoolData ? schoolData.schoolName : null;
  };
  const getMEOName = (meoIdParam) => {
    const meoData = MEOList.find((s) => s.mId === meoIdParam);
    return meoData ? meoData.name : null;
  };
  const acceptGrievance = (grievanceId, callback) => {
    setTimeout(() => {
      setGrievances((prev) =>
        prev.map((d) =>
          d.id === grievanceId ? Object.assign(d, { status: "Completed" }) : d
        )
      );
      callback();
      showToast("Accepted Grievance!");
    }, 2000);
  };

  const getGrievances = () => {
    setTimeout(() => {
      setGrievances([
        {
          category: "Library",
          message: "We need new books out there for good knowledge!",
          subject: "Need Books",
          date: 1595618220673,
          status: "Completed",
          schoolId: "b4b50e26-593e-4169-ae70-406b05407223",
          id: "euirrif-3rjf-rf45oig1",
        },
        {
          category: "Library",
          message: "We need more pullingo to join our school!",
          subject: "Need more Pullingo",
          date: 1595601220673,
          status: "Pending",
          schoolId: "14b50e26-593e-4169-ae70-406b05407223",
          id: "euirrif-3rjf-rf45oig2",
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
        acceptGrievance,
        setVisitId,
        getVisitDataReportOf,
        scheduleVisit,
      }}
    >
      {children}
    </DEOContext.Provider>
  );
};
