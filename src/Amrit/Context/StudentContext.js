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
  const [student, setStudent] = useState({
    name: "Rithik",
    institute: "CIT Matric Hr.Sec.School",
    position: "class_1",
    dob: "02012000",
    ph_no: 9876543230,
    schoolId: "d4bf8383-bc7d-4b38-835d-ab52e744434a",
    studentId: "cef2d05f-74a2-4e10-9348-c6f10868446a",
    roll_no: "01002",
    password: "02012000",
  });
  const isPasswordChanged = () => {
    return student.password !== student.dob;
  };

  const [feedbackList, setFeedbackList] = useState(null);

  const [teachersList, setTeachersList] = useState(null);

  const [latestReportChart, setLatestReportChart] = useState(null);
  const [remarks, setRemarks] = useState(null);

  useEffect(() => {
    if (student && student.studentId) {
      getFeebackFromDB();
      getTeachersListFromDB();
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

  const getTeachersListFromDB = () => {
    fetch(`${appUrl}/student/listteachers/${student.studentId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setTeachersList(res);
        }
      })
      .catch((err) => console.error(err));
  };

  const changePassword = (password, callback) => {
    // callback();
    // setStudent((prev) => Object.assign({}, prev, { password }));

    // console.log("Password changed", password);
    // return;
    fetch(`${appUrl}/student/changepassword/${student.studentId}`, {
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
          setStudent((prev) => Object.assign({}, prev, { password }));
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
    // console.log(teachersList.find((t) => t.teacherId === teacherId));
    // return;
    fetch(`${appUrl}/student/sendFeedBack/${student.studentId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: title,
        name: `${isAnonymous ? "Anonymous" : student.name}`,
        message: message,
        // date: Date.now(),
        rating,
        teacherId,
        position: student.position,
        teacherName: teachersList.find((t) => t.teacherId === teacherId).name,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          callback();
          setFeedbackList((prev) => [
            ...prev,
            {
              subject: title,
              userName: `${isAnonymous ? "Anonymous" : student.name}`,
              message: message,
              date: Date.now(),
              rating,
              id: `${Date.now()}${Math.random()}`,
              teacherId,
              teacherName: teachersList.find((t) => t.teacherId === teacherId)
                .name,
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

  const checkOldPasswordMatches = (password) => {
    return student.password === password;
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
        checkOldPasswordMatches,
        isPasswordChanged,
        changePassword,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
