import React, { useContext } from "react";
import "../../App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SidebarItem from "../../Components/SidebarItem";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import StudentFeedback from "./StudentFeedback";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { StudentContextProvider } from "../Context/StudentContext";
import StudentProfile from "./StudentProfile";

const sidebarOptions = [
  {
    title: "Feedback",
    iconComponent: <RateReviewIcon />,
    component: StudentFeedback,
  },
  {
    title: "Profile",
    iconComponent: <AccountCircleIcon />,
    component: StudentProfile,
  },
];

const StudentRoutes = ({ history, location }) => {
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
              history.push("/student/" + title.toLowerCase());
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
    <StudentContextProvider>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer} aria-label="mailbox folders">
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
                path={"/student/" + title.toLowerCase()}
                component={component}
              />
            ))}
            <Route
              key="default"
              path="/student"
              component={() => <Redirect to="/student/feedback" />}
            />
          </Switch>
        </main>
      </div>
    </StudentContextProvider>
  );
};

export default StudentRoutes;
