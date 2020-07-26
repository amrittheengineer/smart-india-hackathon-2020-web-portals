import React, { useContext, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Add from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RateReviewIcon from "@material-ui/icons/RateReview";
import GrievanceActionDialog from "./GrievanceActionDialog";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import FlatList from "flatlist-react";
import {
  MainbarErrorMessage,
  Loading,
  LinkTab,
  TabPanel,
} from "../Components/MainbarComponent";
import { DEOContext } from "../Context/DEOContext";
import { Tabs, Badge } from "@material-ui/core";

function DEOListGrievance() {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { grievances } = useContext(DEOContext);

  const [tabIndex, setTabIndex] = useState(0);

  const [pendingGrievances, setPendingGrievances] = useState(null);
  const [completedGrievances, setCompletedGrievances] = useState(null);

  const [grievanceDialogOpen, setGrievanceDialogOpen] = useState(false);
  useEffect(() => {
    if (grievances) {
      setPendingGrievances(grievances.filter((g) => g.status === "Pending"));
      setCompletedGrievances(
        grievances.filter((g) => g.status === "Completed")
      );
    }
  }, [grievances]);

  return (
    <>
      <GrievanceActionDialog
        visible={grievanceDialogOpen}
        closeThis={() => setGrievanceDialogOpen(false)}
      />
      <AppBar position="static">
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
            School Grievances
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
                badgeContent={pendingGrievances ? pendingGrievances.length : 0}
              >
                <Typography>Pending</Typography>
              </Badge>
            }
          />
          <LinkTab label="Completed" />
        </Tabs>
      </AppBar>
      <div className="mainbar-content">
        <TabPanel value={tabIndex} index={0}>
          {pendingGrievances ? (
            pendingGrievances.length > 0 ? (
              <FlatList
                list={pendingGrievances.sort((a, b) =>
                  a.date > b.date ? -1 : 1
                )}
                renderItem={(v) => {
                  return (
                    <GrievanceCard
                      key={`${new Date(v.date).toDateString()}`}
                      grievance={v}
                      openGrievance={() => setGrievanceDialogOpen(v)}
                    />
                  );
                }}
                groupBy={(g) => `${new Date(g.date).toDateString()}`}
                groupSeparator={(group, idx, groupLabel) => (
                  <div className="post-category">{groupLabel}</div>
                )}
              />
            ) : (
              <MainbarErrorMessage message="No grievances found." />
            )
          ) : (
            <Loading message="Loading pending grievances" />
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {completedGrievances ? (
            completedGrievances.length > 0 ? (
              <FlatList
                list={completedGrievances.sort((a, b) =>
                  a.date > b.date ? -1 : 1
                )}
                renderItem={(v) => {
                  return (
                    <GrievanceCard
                      key={`${v.date}`}
                      grievance={v}
                      openGrievance={() => setGrievanceDialogOpen(v)}
                    />
                  );
                }}
                groupBy={(g) => `${new Date(g.date).toDateString()}`}
                groupSeparator={(group, idx, groupLabel) => (
                  <div className="post-category">{groupLabel}</div>
                )}
              />
            ) : (
              <MainbarErrorMessage message="No grievances found." />
            )
          ) : (
            <Loading message="Loading completed grievances" />
          )}
        </TabPanel>
      </div>
    </>
  );
}

export const GrievanceCard = ({ grievance, openGrievance }) => {
  const { getSchoolName } = useContext(DEOContext);
  return (
    <div
      className="message-container"
      style={{ cursor: "pointer" }}
      onClick={openGrievance}
    >
      <div className="message-icon">
        <RateReviewIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{`${getSchoolName(
          grievance.schoolId
        )}`}</div>
        <div className="message italic">Category : {grievance.category}</div>
        <div className="message italic">Subject : {grievance.subject}</div>
      </div>
      <div className="italic">{new Date(grievance.date).toDateString()}</div>
    </div>
  );
};

export default DEOListGrievance;
