import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SchoolIcon from "@material-ui/icons/School";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SidebarItem from "../Components/SidebarItem";
import EOGrievencePage from "./EOGrievencePage";
import EOVisitorPage from "./EOVisitorPage";
import EOSchoolPage from "./EOSchoolPage";
import EODashboardPage from "./EODashboardPage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const sidebarOptions = [
  {
    title: "Dashboard",
    iconComponent: <DashboardIcon />,
  },
  {
    title: "Visitors",
    iconComponent: <SupervisorAccountIcon />,
  },
  {
    title: "Schools",
    iconComponent: <SchoolIcon />,
  },
  {
    title: "Grievance",
    iconComponent: <AnnouncementIcon />,
  },
  {
    title: "Log Out",
    iconComponent: <ExitToAppIcon />,
  },
];

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {sidebarOptions.map((option) => (
          <SidebarItem key={option.title} {...option} isActive />
        ))}
      </List>
    </div>
  );

  const container = window.document.body;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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
            Visitor Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/*<EOGrievencePage />*/}
        {/*<EOVisitorPage />*/}
        {/*<EOSchoolPage />*/}
        {/*<EODashboardPage />*/}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
