import React, { useContext, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { Tabs, Tab, Badge, Box, Chip, Button } from "@material-ui/core";
import FlatList from "flatlist-react";
import { DEOContext } from "../Context/DEOContext";
import { InfoOutlined } from "@material-ui/icons";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import HourglassFullTwoToneIcon from "@material-ui/icons/HourglassFullTwoTone";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import { parameterEstimateWarningThreshold } from "../Constants";

function DEOListReport() {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { visitList } = useContext(DEOContext);
  const [tabIndex, setTabIndex] = useState(2);

  const [pendingVisits, setPendingVisits] = useState(null);
  const [completedVisits, setCompletedVisits] = useState(null);
  const [inaccurateVisits, setInaccurateVisits] = useState(null);

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
              <Badge
                color="secondary"
                badgeContent={pendingVisits ? pendingVisits.length : 0}
              >
                <Typography>Pending Visits</Typography>
              </Badge>
            }
          />
          <LinkTab label="Completed" />
          <LinkTab
            label={
              <Badge
                color="secondary"
                badgeContent={inaccurateVisits ? inaccurateVisits.length : 0}
              >
                <Typography>Inaccurate Claims</Typography>
              </Badge>
            }
          />
        </Tabs>
      </AppBar>
      <div className="mainbar-content">
        <TabPanel value={tabIndex} index={0}>
          {pendingVisits ? (
            pendingVisits.length > 0 ? (
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
            )
          ) : (
            <Loading message="Loading pending visits" />
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {completedVisits ? (
            completedVisits.length > 0 ? (
              <FlatList
                list={completedVisits.sort((a, b) =>
                  a.reportDate > b.reportDate ? -1 : 1
                )}
                renderItem={(v) => {
                  // return <p>Hello</p>;
                  return (
                    <VisitReportCardCompleted
                      key={`${v.reportDate}`}
                      visit={v}
                    />
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
            )
          ) : (
            <Loading message="Loading completed visits" />
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          {inaccurateVisits ? (
            inaccurateVisits.length > 0 ? (
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
            )
          ) : (
            <Loading message="Loading inaccuarate complaints" />
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
  const { getSchoolName, getMEOName, calculateReportData } = useContext(
    DEOContext
  );

  const [reportEstimate, setReportEstimate] = useState({});

  useEffect(() => {
    if (visit.reportData) {
      let d = calculateReportData([visit]);
      setReportEstimate(d);
      console.log(d);
    }
  }, []);

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
        <div className="message">
          {reportEstimate
            ? [...Object.keys(reportEstimate)].map((r, i) => (
                <Chip
                  color={
                    reportEstimate[r] > parameterEstimateWarningThreshold
                      ? "primary"
                      : "secondary"
                  }
                  icon={
                    reportEstimate[r] > parameterEstimateWarningThreshold ? (
                      <CheckCircleIcon />
                    ) : (
                      <ErrorTwoToneIcon />
                    )
                  }
                  key={r}
                  label={r}
                  className="category-indicator"
                />
              ))
            : null}
          {/* <Chip
            color="primary"
            label="Clickable Link"
            className="category-indicator"
          />
          <Chip
            color="secondary"
            label="Clickable Link"
            className="category-indicator"
          /> */}
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
  const { getSchoolName, getMEOName, calculateReportData } = useContext(
    DEOContext
  );

  return (
    <div className="message-container">
      <div className="message-icon">
        <ErrorTwoToneIcon color="secondary" />
      </div>
      <div className="message-body">
        <div className="posted-by">
          {getSchoolName(visit.schoolId) || "VVVVV School"}
        </div>
        <div className="message italic">
          Visitor : {getMEOName(visit.mId) || "Mr. VVVVV"}
        </div>
        <div className="message">
          <Button variant="outlined">View Claim</Button>
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

  return value === index ? children : null;
};

export default DEOListReport;
