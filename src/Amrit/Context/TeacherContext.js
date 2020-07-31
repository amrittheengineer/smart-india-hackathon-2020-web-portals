import React, { createContext, useState, useEffect, useContext } from "react";
import {
  NOT_LOGGED_IN,
  NO_PENDING_VISITS,
  NO_REPORTS,
  appUrl,
} from "../Constants";
import { GlobalStateContext } from "./GlobalStateContext";

export const TeacherContext = createContext();

// Logged in
const schoolidTemp = "iuerhifrehfue";

// Logged out
// const Teacher.idTemp = null;

export const TeacherContextProvider = ({ children }) => {
  const [Teacher, setTeacher] = useState({
    id: "06da6e93-cd10-4780-b67b-8e0613703ae9",
    name: "Mr. Paltu",
    // id: "69bd7ffd-e3ea-402a-9577-c2810fb66d4",
  });

  const { getChartPlots } = useContext(GlobalStateContext);

  const [reviewsList, setReviewsList] = useState(null);

  const [latestReport, setLatestReport] = useState(null);
  const [previousReport, setPreviousReport] = useState(null);

  const [latestReportChart, setLatestReportChart] = useState(null);
  const [remarks, setRemarks] = useState(null);

  useEffect(() => {
    if (Teacher && Teacher.id) {
      getReviewsList();
      getClassRoomTransactions();
    }
  }, [Teacher]);

  const getClassRoomTransactions = () => {
    setTimeout(() => {
      setLatestReport({
        reportData: [
          {
            categoryName: "Teaching",
            fieldData: [
              {
                question: "Ygfw",
                qType: 0,
                answer: "1",
              },
              {
                question: "Ygfw",
                qType: 0,
                answer: "3",
              },
            ],
          },
          {
            categoryName: "Listening",
            fieldData: [
              {
                question: "Ygfw",
                qType: 0,
                answer: "4",
              },
              {
                question: "Ygfw",
                qType: 0,
                answer: "5",
              },
            ],
          },
        ],
      });
      setRemarks([
        {
          categoryName: "Listening",
          message: "Need to give more attention to students doubts.",
        },
      ]);
    }, 3000);
  };

  useEffect(() => {
    if (latestReport) {
      let newPlots = getChartPlots([latestReport]);

      setLatestReportChart(newPlots);
    } else {
      setLatestReportChart(null);
    }
  }, [latestReport]);

  const getReviewsFromDB = () => {
    fetch(`${appUrl}/Teacher/getallschools/${Teacher.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setReviewsList(res);
        }
      })
      .catch((err) => console.error(err));
  };
  // useEffect(() => {
  //   if (previousReport) {
  //     let prevPlots = getChartPlots([previousReport]);
  //     const prevRepCopy = [];

  //     // Setting labels
  //     const labels = latestReport.reportData.map(
  //       ({ categoryName }) => categoryName
  //     );
  //     if (labels.length > 0) {
  //       labels.forEach((l) => {
  //         prevRepCopy.push(prevPlots[l]);
  //       });
  //       setPreviousReportChart(prevRepCopy);
  //     }
  //   } else {
  //     setPreviousReportChart(null);
  //   }
  // }, [previousReport]);

  const { showToast } = useContext(GlobalStateContext);

  const getReviewsList = () => {
    setTimeout(() => {
      setReviewsList([
        {
          subject: "Poor Explaination",
          userName: "Anonymous",
          message: "Need clear explaination on Quantum Physics",
          date: Date.now(),
          rating: 4,
          id: "fuierfher-riu4hf",
        },
      ]);
    }, 1000);
  };

  return (
    <TeacherContext.Provider
      value={{
        Teacher,
        reviewsList,
        latestReportChart,
        remarks,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
