import React, { useContext } from "react";
import "../../App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SchoolIcon from "@material-ui/icons/School";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SidebarItem from "../../Components/SidebarItem";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import ListMEO from "./DEOListMEO";
import DEOListSchool from "./DEOSchools";
import DEOListReport from "./DEOVisitorReport";
import Questionnaire from "./DEOQuestionnaire";
import DEOListGrievance from "./DEOGrievance";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { DEOContextProvider } from "../Context/DEOContext";
import ViewReportGraph from "./ViewReportGraph";

const sidebarOptions = [
  {
    title: "Reports",
    iconComponent: <SupervisorAccountIcon />,
    component: DEOListReport,
  },
  {
    title: "MEO",
    iconComponent: <DashboardIcon />,
    component: ListMEO,
  },
  {
    title: "Schools",
    iconComponent: <SchoolIcon />,
    component: DEOListSchool,
  },
  {
    title: "Grievance",
    iconComponent: <AnnouncementIcon />,
    component: DEOListGrievance,
  },
  {
    title: "Questionnaire",
    iconComponent: <AssessmentIcon />,
    component: Questionnaire,
  },
];

function DEORoutes({ history, location }) {
  const { classes, theme, mobileOpen, handleDrawerToggle } = useContext(
    GlobalStateContext
  );
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {sidebarOptions.map(({ title, iconComponent }) => (
          <SidebarItem
            key={title}
            title={title}
            iconComponent={iconComponent}
            isActive={location.pathname.split("/")[2] === title.toLowerCase()}
            onClick={() => {
              history.push("/deo/" + title.toLowerCase());
            }}
          />
        ))}
        <React.Fragment>
          <ListItem
            button
            style={{ padding: "16px" }}
            onClick={() => {
              // Log out user
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
          <Divider />
        </React.Fragment>
      </List>
    </div>
  );

  const container = window.document.body;

  return (
    <DEOContextProvider>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className="mainbar">
          <Switch>
            {sidebarOptions.map(({ title, component }) => (
              <Route
                key={title}
                path={"/deo/" + title.toLowerCase()}
                component={component}
                exact
              />
            ))}
            <Route
              path="/deo/reports/:reportId"
              exact
              component={ViewReportGraph}
            />
            <Route path="/" render={() => <Redirect to="/deo/reports" />} />
          </Switch>
        </main>
      </div>
    </DEOContextProvider>
  );
}

export default DEORoutes;
