import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import TeacherReview from "./TeacherReview";
import TeacherFeedback from "./TeacherFeedback";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { SupervisedUserCircleRounded } from "@material-ui/icons";

import SidebarItem from "../../Components/SidebarItem";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { TeacherContext } from "../Context/TeacherContext";
import "../../App.css";

const sidebarOptions = [
  {
    title: "Reviews",
    iconComponent: <AssessmentIcon />,
    component: TeacherReview,
  },
  {
    title: "Feedback",
    iconComponent: <SupervisorAccountIcon />,
    component: TeacherFeedback,
  },
  // {
  //   title: "Profile",
  //   iconComponent: <AccountCircleIcon />,
  //   component: TeacherProfile,
  // },
];

const TeacherRoutes = ({ history, location }) => {
  const { classes, theme, mobileOpen, handleDrawerToggle } =
    useContext(GlobalStateContext);
  const { teacher } = useContext(TeacherContext);
  const drawer = (
    <div>
      <List>
        <ListItem style={{ padding: "16px" }}>
          <ListItemText primary="Teacher" className="sidebar-role" />
        </ListItem>
        <Divider />
        <ListItem style={{ padding: "16px" }}>
          <ListItemIcon>
            <SupervisedUserCircleRounded />
          </ListItemIcon>
          <ListItemText primary={teacher.name} />
        </ListItem>
        <Divider />
        {sidebarOptions.map(({ title, iconComponent }) => (
          <SidebarItem
            key={title}
            title={title}
            iconComponent={iconComponent}
            isActive={location.pathname.split("/")[2] === title.toLowerCase()}
            onClick={() => {
              history.push("/teacher/" + title.toLowerCase());
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
            <ListItemText className="sidebar-item-text" primary="Log Out" />
          </ListItem>
        </React.Fragment>
      </List>
    </div>
  );

  const container = window.document.body;

  return (
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
              path={"/teacher/" + title.toLowerCase()}
              component={component}
            />
          ))}

          <Route
            key="default"
            path="/teacher"
            component={() => <Redirect to="/teacher/reviews" />}
          />
        </Switch>
      </main>
    </div>
  );
};

export default TeacherRoutes;
