import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { DEOContext } from "../Context/DEOContext";
import SchoolIcon from "@material-ui/icons/School";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import { Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import ScheduleSchoolVisit from "./ScheduleSchoolVisit";

const DEOListSchool = (props) => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { schoolList } = useContext(DEOContext);

  const [scheduleSchoolId, setScheduleSchoolId] = useState(null);

  return (
    <>
      <ScheduleSchoolVisit
        schoolId={scheduleSchoolId}
        closeThis={() => setScheduleSchoolId(null)}
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
          <Typography variant="h6" className={classes.title}>
            Schools
          </Typography>
          {/* <Button
            color="inherit"
            variant="outlined"
            onClick={() => {}}
            startIcon={<Add />}
            size="small"
          >
            Add School
          </Button> */}
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {schoolList ? (
          schoolList.length > 0 ? (
            schoolList
              .sort((a, b) => a.lastVisited > b.lastVisited)
              .map((s) => (
                <SchoolCard
                  setScheduleSchoolId={setScheduleSchoolId}
                  school={s}
                  key={s.schoolId}
                />
              ))
          ) : (
            // grievances.map((g) => <GrievanceCard key={g.date} grievance={g} />)
            <MainbarErrorMessage message="No schools found." />
          )
        ) : (
          <Loading message="Loading schools..." />
        )}
      </div>
    </>
  );
};

const SchoolCard = ({ school, setScheduleSchoolId }) => {
  const { getSchoolName } = useContext(DEOContext);

  return (
    <div className="message-container">
      <div className="message-icon">
        <SchoolIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">
          {`${getSchoolName(school.schoolId)} - ${school.mandalName}` ||
            "VVVVV School"}
        </div>
        <div className="message italic">
          Address : {school.schoolAddress || "School Address"}
        </div>
        <div className="message">
          <Button
            onClick={() => {
              setScheduleSchoolId(school.schoolId);
            }}
            variant="outlined"
          >
            Schedule
          </Button>
        </div>
      </div>
      <div className="italic">{`Last visited on : ${new Date(
        school.lastVisited
      ).toDateString()}`}</div>
    </div>
  );
};

export default DEOListSchool;
