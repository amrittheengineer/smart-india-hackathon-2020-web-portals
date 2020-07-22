import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Add from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { GlobalStateContext } from "../Context/GlobalStateContext";

function SchoolListGrievance(props) {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);

  return (
    <>
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
            Our School Grievances
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {}}
            startIcon={<Add />}
            size="small"
          >
            New Grievance
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        <p>Hello</p>
      </div>
    </>
  );
}

export default SchoolListGrievance;
