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
// const teacher.teacherIdTemp = null;

export const TeacherContextProvider = ({ children }) => {
  // const [teacher, setteacher] = useState({
  //   teacherId: "fe1d5c4b-35ae-4b40-86dd-a05218813744",
  //   name: "teacher. Paltu",
  //   // id: "69bd7ffd-e3ea-402a-9577-c2810fb66d4",
  // });
  const [teacher, setTeacher] = useState({
    handling: ["class_1", "class_4"],
    name: "Annie Teacher",
    institute: "CIT Matric Hr.Sec.School",
    ph_no: 9876553210,
    schoolId: "d4bf8383-bc7d-4b38-835d-ab52e744434a",
    // teacherId: "e31be291-6d31-4cde-96cd-3987a4abe540",
    teacherId: "fd2ae741-d312-4d9e-ba9c-2c281e663692",
    password: "9876553210",
  });

  const changePassword = (password, callback) => {
    fetch(`${appUrl}/teacher/changepassword/${teacher.teacherId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          callback();
          setTeacher((prev) => Object.assign({}, prev, { password }));
        }
      })
      .catch((err) => console.error(err));
  };

  const { getChartPlots } = useContext(GlobalStateContext);

  const [feedbackList, setFeedbackList] = useState(null);

  const [latestReport, setLatestReport] = useState(null);

  const [latestReportChart, setLatestReportChart] = useState(null);
  const [remarks, setRemarks] = useState(null);

  useEffect(() => {
    if (teacher && teacher.teacherId) {
      getFeedbacksFromDB();
      getClassRoomTransactions();
    }
  }, [teacher]);

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

  const getFeedbacksFromDB = () => {
    fetch(`${appUrl}/teacher/listfeedbacks/${teacher.teacherId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setFeedbackList(res);
        }
      })
      .catch((err) => console.error(err));
  };

  const { showToast } = useContext(GlobalStateContext);

  const getFeedbacks = () => {
    setTimeout(() => {
      setFeedbackList([
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

  const checkOldPasswordMatches = (password) => {
    return teacher.password === password;
  };

  const isPasswordChanged = () => {
    return teacher.password !== `${teacher.ph_no}`;
  };

  return (
    <TeacherContext.Provider
      value={{
        teacher,
        feedbackList,
        latestReportChart,
        remarks,
        isPasswordChanged,
        changePassword,
        checkOldPasswordMatches,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
