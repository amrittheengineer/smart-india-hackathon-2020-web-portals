import React, { useContext } from "react";
import "../../App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Hidden,
  Drawer,
} from "@material-ui/core";
import AssessmentIcon from "@material-ui/icons/Assessment";
import {
  TeacherContextProvider,
  TeacherContext,
} from "../Context/TeacherContext";
import logo from "../images/teacher-img.jpg";
import { SupervisedUserCircleRounded } from "@material-ui/icons";
import SidebarItem from "../../Components/SidebarItem";
// import DistrictWiseReportPublic from "./DistrictWiseReportPublic";
import DistrictWiseReport from "../DEO/DistrictWiseReport";
import PublicSchoolReviews from "./PublicSchoolReviews";
import GeneralPosts from "./GeneralPosts";

const sidebarOptions = [
  // {
  //   title: "Reviews",
  //   iconComponent: <AssessmentIcon />,
  //   component: TeacherReview,
  // },
  // {
  //   title: "Feedback",
  //   iconComponent: <SupervisorAccountIcon />,
  //   component: TeacherFeedback,
  // },
  // {
  //   title: "Profile",
  //   iconComponent: <AccountCircleIcon />,
  //   component: TeacherProfile,
  // },
  {
    title: "Home",
    component: GeneralPosts,
  },
  {
    title: "District Reports",
    component: DistrictWiseReport,
  },
  {
    title: "Reviews",
    component: PublicSchoolReviews,
  },
];

const PublicRoutes = ({ history, location }) => {
  const { classes, theme, mobileOpen, handleDrawerToggle } = useContext(
    GlobalStateContext
  );
  const drawer = (
    <div>
      <List>
        <ListItem style={{ padding: "16px" }}>
          <ListItemText primary="AP-AMS" className="sidebar-role" />
        </ListItem>

        <Divider />
        <ListItem style={{ padding: "16px" }}>
          <ListItemIcon>
            <SupervisedUserCircleRounded />
          </ListItemIcon>
          <ListItemText primary={"Public Portal"} />
        </ListItem>
        <Divider />
        {sidebarOptions.map(({ title, iconComponent }) => (
          <SidebarItem
            key={title}
            title={title}
            iconComponent={iconComponent}
            isActive={location.pathname.split("/")[2] === title.toLowerCase()}
            onClick={() => {
              history.push("/public/" + title.toLowerCase());
            }}
          />
        ))}
      </List>
    </div>
  );

  const container = window.document.body;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
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
              path={"/public/" + title.toLowerCase()}
              component={component}
              exact
            />
          ))}
          <Route path="/" render={() => <Redirect to="/public/home" />} />
        </Switch>
      </main>
    </div>
  );
};

export default PublicRoutes;
