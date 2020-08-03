import React, { useContext, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import "../../App.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import {
  FormControl,
  Chip,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import FlatList from "flatlist-react";
import { DEOContext } from "../Context/DEOContext";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import SchoolIcon from "@material-ui/icons/School";
import {
  MainbarErrorMessage,
  Loading,
  LinkTab,
  TabPanel,
} from "../Components/MainbarComponent";
import { parameterEstimateWarningThreshold } from "../Constants";

function SelectCategory({ defaultValue, onChange }) {
  return (
    <div>
      <FormControl variant="outlined" className="modal-input">
        <InputLabel>Select Rold</InputLabel>
        <Select
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          defaultValue={defaultValue}
          label="Select Role"
        >
          {["DEO", "School", "Teacher", "Student"].map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const Login = ({ history }) => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);

  const [str, setStr] = useState("Student");

  return (
    <>
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
          <Typography variant="h6" noWrap>
            Welcome to AP-APM Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <main className="mainbar">
        <div className="mainbar-content">
          <div className="container">
            <div className="content">
              <Typography variant="h4">Login</Typography>
              <SelectCategory defaultValue={str} onChange={(s) => setStr(s)} />
              <TextField
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                className="modal-input"
                autoFocus={true}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className="modal-input"
                type="password"
              />

              <Button
                variant="contained"
                style={{ display: "block", margin: "16px" }}
                onClick={() => history.push("/" + str)}
              >
                Login
              </Button>
              {/* <Button
                variant="contained"
                style={{ display: "block", margin: "16px" }}
                onClick={() => history.push("/teacher")}
              >
                Teacher Login
              </Button>
              <Button
                variant="contained"
                style={{ display: "block", margin: "16px" }}
                onClick={() => history.push("/school")}
              >
                School Login
              </Button>
              <Button
                variant="contained"
                style={{ display: "block", margin: "16px" }}
                onClick={() => history.push("/deo")}
              >
                DEO Login
              </Button> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const VisitReportCardPending = ({ visit }) => {
  const { getSchoolName, getMEOName } = useContext(DEOContext);

  return (
    <div className="message-container">
      <div className="message-icon">
        <SchoolIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">
          {visit.schoolName || getSchoolName(visit.schoolId) || "VVVVV School"}
        </div>
        <div className="message italic">
          Visitor : {getMEOName(visit.mId) || "Mr. VVVVV"}
        </div>
      </div>
      <div className="italic">{`Scheduled : ${new Date(
        visit.reportDate
      ).toDateString()}`}</div>
    </div>
  );
};
const VisitReportCardCompleted = ({ visit, onClick }) => {
  const { getMEOName, calculateReportData } = useContext(DEOContext);

  const [reportEstimate, setReportEstimate] = useState({});

  useEffect(() => {
    if (visit.reportData) {
      let d = calculateReportData([visit]);
      setReportEstimate(d);
    }
  }, []);

  return (
    <div className="message-container" onClick={onClick}>
      <div className="message-icon">
        <AssignmentTurnedInTwoToneIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{visit.schoolName || "VVVVV School"}</div>
        <div className="message italic">
          Visitor : {getMEOName(visit.mId) || "Mr. VVVVV"}
        </div>
        <div className="message">
          {reportEstimate
            ? [
                ...Object.keys(reportEstimate).filter(
                  (r) => reportEstimate[r] < parameterEstimateWarningThreshold
                ),
              ].map((r, i) => (
                <Chip
                  color={
                    // reportEstimate[r] > parameterEstimateWarningThreshold
                    //   ? "primary"
                    //   :
                    "secondary"
                  }
                  icon={
                    // reportEstimate[r] > parameterEstimateWarningThreshold ? (
                    //   <CheckCircleIcon />
                    // ) :
                    <ErrorTwoToneIcon />
                  }
                  key={r}
                  label={r}
                  className="category-indicator"
                  variant="outlined"
                />
              ))
            : null}
        </div>
      </div>
      <div className="italic">{`Visited on : ${new Date(
        visit.reportDate
      ).toDateString()}`}</div>
    </div>
  );
};
const VisitReportCardInaccurate = ({ visit, setInaccurateClaim, onClick }) => {
  const { getMEOName } = useContext(DEOContext);

  return (
    <div className="message-container">
      <div className="message-icon">
        <ErrorTwoToneIcon color="secondary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{visit.schoolName || "VVVVV School"}</div>
        <div className="message italic">
          Visitor : {getMEOName(visit.mId) || "Mr. VVVVV"}
        </div>
        <div className="message">
          <Button
            onClick={() =>
              setInaccurateClaim(
                Object.assign(visit.inaccurateReport, {
                  schoolId: visit.schoolId,
                })
              )
            }
            variant="outlined"
          >
            View Claim
          </Button>
          <Button
            onClick={onClick}
            variant="outlined"
            style={{ marginLeft: "16px" }}
          >
            View Report
          </Button>
        </div>
      </div>
      <div className="italic">{`Visited on : ${new Date(
        visit.reportDate
      ).toDateString()}`}</div>
    </div>
  );
};

export default Login;
