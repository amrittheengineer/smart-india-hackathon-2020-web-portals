import React, { useContext, useEffect, useState, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import { Button, Paper } from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "react-circular-progressbar/dist/styles.css";
import { parameterEstimateWarningThreshold } from "../Constants";
import { InfoOutlined } from "@material-ui/icons";
import { StudentContext } from "../Context/StudentContext";
import ChangePasswordDialog from "./ChangePasswordDialog";

const StudentProfile = () => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { student } = useContext(StudentContext);

  const [changePasswordDialog, setChangePasswordDialog] = useState(false);

  return (
    <>
      {/* <InaccurateReportButton /> */}
      <ChangePasswordDialog
        visible={changePasswordDialog}
        closeThis={() => setChangePasswordDialog(false)}
      />
      <AppBar position="relative" className="app-bar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Student Profile
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {
              setChangePasswordDialog(true);
            }}
            size="small"
            // style={{ marginRight: "24px" }}
          >
            Change Password
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        <Paper variant="outlined" className="profile-container">
          <AccountCircleIcon color="primary" className="profile-avatar" />
          {/* <div className="profile-entity-container"> */}
          <ProfileEntity name="Name" value={`${student.name}`} />
          <ProfileEntity
            name="Class"
            value={`${student.position ? student.position.split("_")[1] : ""}`}
          />
          <ProfileEntity name="Roll No." value={`${student.roll_no}`} />
          <ProfileEntity
            name="Date of birth"
            value={`${
              student.dob
                ? `${student.dob.slice(0, 2)} / ${student.dob.slice(
                    2,
                    4
                  )} / ${student.dob.slice(4, 8)}`
                : ""
            }`}
          />
          <ProfileEntity name="Phone" value={`${student.ph_no}`} />
          <ProfileEntity name="Institute" value={`${student.institute}`} />
          {/* </div> */}
        </Paper>

        {/* ) : (
          <Loading message="Loading reports..." />
        ) */}
      </div>
    </>
  );
};

export const ProfileEntity = ({ name, value }) => {
  return (
    <Paper variant="outlined" className="profile-entity-holder">
      <div className="profile-entity">{`${name}: `}</div>
      <div className="profile-entity">{`${value}`}</div>
    </Paper>
  );
};

// const FeedbackIndicator = ({ category, ...props }) => {
//   return (
//     <div className="indicator-card">
//       <div className="indicator">
//         <CircularProgressbar
//           {...props}
//           styles={buildStyles(
//             props.value >= parameterEstimateWarningThreshold
//               ? {
//                   textColor: "#3f51b5",
//                   pathColor: "#3f51b5",
//                   // trailColor: "gold",
//                 }
//               : { textColor: "#f50057", pathColor: "#f50057" }
//           )}
//         />
//       </div>
//       <div className="indicator-category">
//         <h4
//           style={
//             props.value >= parameterEstimateWarningThreshold
//               ? { color: "#3f51b5" }
//               : { color: "#f50057" }
//           }
//         >
//           {category}
//         </h4>
//       </div>
//     </div>
//   );
// };

export default StudentProfile;
