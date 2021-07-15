import React, { useContext } from "react";
import "../../App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SidebarItem from "../../Components/SidebarItem";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import CropFreeIcon from "@material-ui/icons/CropFree";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SchoolReport from "./SchoolReport";
import SchoolListGrievance from "./SchoolGrievance";
import SchoolQRCode from "./SchoolQRCode";
import SchoolRemark from "./SchoolRemark";
import logo from "../images/logo.jpeg";
import { SupervisedUserCircleRounded } from "@material-ui/icons";
import { SchoolContext } from "../Context/SchoolContext";

const sidebarOptions = [
  {
    title: "Dashboard",
    iconComponent: <SupervisorAccountIcon />,
    component: SchoolReport,
  },
  {
    title: "Our Requirements",
    iconComponent: <AnnouncementIcon />,
    component: SchoolListGrievance,
  },
  {
    title: "QR-Code",
    iconComponent: <CropFreeIcon />,
    component: SchoolQRCode,
  },
];

const SchoolRoutes = ({ history, location }) => {
  const { classes, theme, mobileOpen, handleDrawerToggle } = useContext(
    GlobalStateContext
  );
  const drawer = (
    <div>
      <List>
        <ListItem style={{ padding: "16px" }}>
          <ListItemText primary="School" className="sidebar-role" />
        </ListItem>
        <Divider />
        <ListItem style={{ padding: "16px" }}>
          <ListItemIcon>
            <SupervisedUserCircleRounded />
          </ListItemIcon>
          <ListItemText primary="DON Bosco" />
        </ListItem>
        <Divider />
        {sidebarOptions.map(({ title, iconComponent }) => (
          <SidebarItem
            key={title}
            title={title}
            iconComponent={iconComponent}
            isActive={location.pathname.split("/")[2] === title.toLowerCase()}
            onClick={() => {
              history.push("/school/" + title.toLowerCase());
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
          <Route
            key="remarks"
            path="/school/reports/remarks"
            exact
            component={SchoolRemark}
          />
          {sidebarOptions.map(({ title, component }) => (
            <Route
              key={title}
              path={"/school/" + title.toLowerCase()}
              component={component}
            />
          ))}

          <Route
            key="default"
            path="/school"
            component={() => <Redirect to="/school/dashboard" />}
          />
        </Switch>
      </main>
    </div>
  );
};

export default SchoolRoutes;
