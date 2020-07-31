import React, { createContext, useState, useEffect, useContext } from "react";
import {
  NOT_LOGGED_IN,
  NO_PENDING_VISITS,
  NO_REPORTS,
  appUrl,
} from "../Constants";
import { GlobalStateContext } from "./GlobalStateContext";

export const StudentContext = createContext();

// Logged in
const schoolidTemp = "iuerhifrehfue";

// Logged out
// const student.studentIdTemp = null;

export const StudentContextProvider = ({ children }) => {
  const [student, setstudent] = useState({
    name: "Rithik",
    institute: "CIT Matric Hr.Sec.School",
    position: "class_1",
    dob: "02012000",
    ph_no: 9876543230,
    schoolId: "d4bf8383-bc7d-4b38-835d-ab52e744434a",
    studentId: "0eb5408e-46b3-49fa-b0b5-95f4c8004557",
    roll_no: "01002",
    password: "02012000",
    __v: 0,
  });

  const [feedbackList, setFeedbackList] = useState(null);

  const [teachersList, setTeachersList] = useState(null);

  const [latestReportChart, setLatestReportChart] = useState(null);
  const [remarks, setRemarks] = useState(null);

  useEffect(() => {
    if (student && student.studentId) {
      getFeebackFromDB();
      getTeachersList();
    }
  }, [student]);

  const getTeachersList = () => {
    setTimeout(() => {
      setTeachersList([
        {
          name: "Mr. Janarthanan",
          id: "cfbcube-vfv-vgvrgv",
        },
      ]);
    }, 1000);
  };

  const getFeebackFromDB = () => {
    fetch(`${appUrl}/student/listfeedbacks/${student.studentId}`, {
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

  const reportFeedback = (
    message,
    title,
    rating,
    teacherId,
    isAnonymous,
    callback
  ) => {
    fetch(`${appUrl}/student/sendFeedBack/${student.studentId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: title,
        name: isAnonymous ? "Anonymous" : student.name,
        message: message,
        // date: Date.now(),
        rating,
        teacherId,
        position: student.position,
        // teacherName: teachersList.find((t) => t.id === teacherId).name,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          callback();
          setFeedbackList((prev) => [
            ...prev,
            {
              subject: title,
              name: `${isAnonymous ? "Anonymous" : student.name}`,
              message: message,
              // date: Date.now(),
              rating,
              id: `${Date.now()}${Math.random()}`,
              teacherId,
              // teacherName: teachersList.find((t) => t.id === teacherId).name,
            },
          ]);
        }
      })
      .catch((err) => console.error(err));
  };
  const reportFeedbackOld = (
    message,
    title,
    rating,
    teacherId,
    isAnonymous,
    callback
  ) => {
    setTimeout(() => {
      setFeedbackList((prev) => [
        ...prev,
        {
          subject: title,
          userName: isAnonymous ? "Anonymous" : student.name,
          message: message,
          date: Date.now(),
          rating,
          id: `${Date.now()}${Math.random()}`,
          teacherId,
          teacherName: teachersList.find((t) => t.id === teacherId).name,
        },
      ]);
      callback();
    }, 1000);
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

  const getFeedbackList = () => {
    setTimeout(() => {
      setFeedbackList([
        {
          subject: "Poor Explaination",
          userName: "Anonymous",
          message: "Need clear explaination on Quantum Physics",
          date: Date.now(),
          rating: 4,
          id: "fuierfher-riu4hf",
          teacherId: "rtgtg",
          teacherName: "Mr. Master",
        },
      ]);
    }, 1000);
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        feedbackList,
        latestReportChart,
        remarks,
        reportFeedback,
        teachersList,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
