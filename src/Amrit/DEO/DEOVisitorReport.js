import React, { useContext, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { Tabs, Tab, Badge, Box } from "@material-ui/core";
import FlatList from "flatlist-react";
import { DEOContext } from "../Context/DEOContext";
import { InfoOutlined } from "@material-ui/icons";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import HourglassFullTwoToneIcon from "@material-ui/icons/HourglassFullTwoTone";
import { MainbarErrorMessage } from "../Components/MainbarComponent";

function DEOListReport() {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { visitList } = useContext(DEOContext);
  const [tabIndex, setTabIndex] = useState(0);

  const [pendingVisits, setPendingVisits] = useState([]);
  const [completedVisits, setCompletedVisits] = useState([]);
  const [inaccurateVisits, setInaccurateVisits] = useState([]);

  useEffect(() => {
    if (visitList) {
      setPendingVisits(visitList.filter((v) => !v.reportData));
      setCompletedVisits(
        visitList.filter((v) => !!v.reportData && !v.inaccurateReport)
      );
      setInaccurateVisits(
        visitList.filter((v) => !!v.reportData && !!v.inaccurateReport)
      );
    }
  }, [visitList]);

  return (
    <>
      <AppBar position="static" color="primary">
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
            Visitor Reports
          </Typography>
        </Toolbar>
        <Tabs
          variant="fullWidth"
          value={tabIndex}
          onChange={(e, selectedIndex) => {
            setTabIndex(selectedIndex);
          }}
          aria-label="Report Tabs"
          indicatorColor="secondary"
          TabIndicatorProps={{ style: { background: "#fff" } }}
        >
          <LinkTab
            label={
              <Badge color="secondary" badgeContent={pendingVisits.length}>
                <Typography>Pending Visits</Typography>
              </Badge>
            }
          />
          <LinkTab label="Completed" />
          <LinkTab
            label={
              <Badge color="secondary" badgeContent={33}>
                <Typography>Inaccurate Claims</Typography>
              </Badge>
            }
          />
        </Tabs>
      </AppBar>
      <div className="mainbar-content">
        <TabPanel value={tabIndex} index={0}>
          {pendingVisits && pendingVisits.length > 0 ? (
            <FlatList
              list={pendingVisits.sort((a, b) =>
                a.reportDate > b.reportDate ? -1 : 1
              )}
              renderItem={(v) => {
                // return <p>Hello</p>;
                return (
                  <VisitReportCardPending key={`${v.reportDate}`} visit={v} />
                );
              }}
              groupBy={(g) => `${new Date(g.reportDate).toDateString()}`}
              groupSeparator={(group, idx, groupLabel) => (
                <div className="post-category">{groupLabel}</div>
              )}
            />
          ) : (
            // grievances.map((g) => <GrievanceCard key={g.date} grievance={g} />)
            <MainbarErrorMessage message="No grievances found." />
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {completedVisits && completedVisits.length > 0 ? (
            <FlatList
              list={completedVisits.sort((a, b) =>
                a.reportDate > b.reportDate ? -1 : 1
              )}
              renderItem={(v) => {
                // return <p>Hello</p>;
                return (
                  <VisitReportCardCompleted key={`${v.reportDate}`} visit={v} />
                );
              }}
              groupBy={(g) => `${new Date(g.reportDate).toDateString()}`}
              groupSeparator={(group, idx, groupLabel) => (
                <div className="post-category">{groupLabel}</div>
              )}
            />
          ) : (
            // grievances.map((g) => <GrievanceCard key={g.date} grievance={g} />)
            <MainbarErrorMessage message="No grievances found." />
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          {inaccurateVisits && inaccurateVisits.length > 0 ? (
            <FlatList
              list={inaccurateVisits.sort((a, b) =>
                a.inaccurateReport.complaintDate >
                b.inaccurateReport.complaintDate
                  ? -1
                  : 1
              )}
              renderItem={(v) => {
                // return <p>Hello</p>;
                return (
                  <VisitReportCardInaccurate
                    key={`${v.reportDate}`}
                    visit={v}
                  />
                );
              }}
              groupBy={(g) =>
                `${new Date(g.inaccurateReport.complaintDate).toDateString()}`
              }
              groupSeparator={(group, idx, groupLabel) => (
                <div className="post-category">{groupLabel}</div>
              )}
            />
          ) : (
            // grievances.map((g) => <GrievanceCard key={g.date} grievance={g} />)
            <MainbarErrorMessage message="No grievances found." />
          )}
        </TabPanel>
      </div>
    </>
  );
}

const VisitReportCardPending = ({ visit }) => {
  const { getSchoolName, getMEOName } = useContext(DEOContext);

  return (
    <div className="message-container">
      <div className="message-icon">
        <HourglassFullTwoToneIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">
          {getSchoolName(visit.schoolId) || "VVVVV School"}
        </div>
        <div className="message italic">
          Visitor : {getMEOName(visit.mId) || "Mr. VVVVV"}
        </div>
      </div>
      <div className="italic">{`Schedued : ${new Date(
        visit.reportDate
      ).toDateString()}`}</div>

      {/* <div className="message-container">
      <div className="message-icon">
      <InfoOutlined color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{getSchoolName(visit.schoolId) || "VVVVV School"}</div>
        <div className="message">{grievance.message}</div>
      </div>
      <div className="italic">{new Date(visit.reportDate).toDateString()}</div>
    </div> */}
    </div>
  );
};
const VisitReportCardCompleted = ({ visit }) => {
  const { getSchoolName, getMEOName } = useContext(DEOContext);

  return (
    <div className="message-container">
      <div className="message-icon">
        <AssignmentTurnedInTwoToneIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">
          {getSchoolName(visit.schoolId) || "VVVVV School"}
        </div>
        <div className="message italic">
          Visitor : {getMEOName(visit.mId) || "Mr. VVVVV"}
        </div>
      </div>
      <div className="italic">{`Visited on : ${new Date(
        visit.reportDate
      ).toDateString()}`}</div>

      {/* <div className="message-container">
      <div className="message-icon">
      <InfoOutlined color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{getSchoolName(visit.schoolId) || "VVVVV School"}</div>
        <div className="message">{grievance.message}</div>
      </div>
      <div className="italic">{new Date(visit.reportDate).toDateString()}</div>
    </div> */}
    </div>
  );
};
const VisitReportCardInaccurate = ({ visit }) => {
  const { getSchoolName, getMEOName } = useContext(DEOContext);

  return (
    <div className="message-container">
      <div className="message-icon">
        <ErrorTwoToneIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">
          {getSchoolName(visit.schoolId) || "VVVVV School"}
        </div>
        <div className="message italic">
          Visitor : {getMEOName(visit.mId) || "Mr. VVVVV"}
        </div>
      </div>
      <div className="italic">{`Visited on : ${new Date(
        visit.reportDate
      ).toDateString()}`}</div>

      {/* <div className="message-container">
      <div className="message-icon">
      <InfoOutlined color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{getSchoolName(visit.schoolId) || "VVVVV School"}</div>
        <div className="message">{grievance.message}</div>
      </div>
      <div className="italic">{new Date(visit.reportDate).toDateString()}</div>
    </div> */}
    </div>
  );
};

function LinkTab(props) {
  return (
    <Tab
      component="div"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      // hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default DEOListReport;
