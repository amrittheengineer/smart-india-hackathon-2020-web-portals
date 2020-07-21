import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";

function DEOListReport() {
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
          <Typography variant="h6" noWrap>
            Visitor Reports
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        <p>Hello</p>
      </div>
    </>
  );
}

export default DEOListReport;
