import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { DEOContext } from "../Context/DEOContext";
import SchoolIcon from "@material-ui/icons/School";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import { Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import ScheduleSchoolVisit from "./ScheduleSchoolVisit";
import { DistrictGraph } from "../Components/DistrictGraph";

const DistrictWiseReport = (props) => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { schoolList } = useContext(DEOContext);

  const [scheduleSchoolId, setScheduleSchoolId] = useState(null);

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
            District Reports
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {true ? (
          1 > 0 ? (
            <div className="district-graph-container">
              <DistrictGraph
                districtData={{ districtName: "Chitoor", reportData: [] }}
              />
              <DistrictGraph
                districtData={{ districtName: "Chitoor", reportData: [] }}
              />
              <DistrictGraph
                districtData={{ districtName: "Chitoor", reportData: [] }}
              />
              <DistrictGraph
                districtData={{ districtName: "Chitoor", reportData: [] }}
              />
              <DistrictGraph
                districtData={{ districtName: "Chitoor", reportData: [] }}
              />
              <DistrictGraph
                districtData={{ districtName: "Chitoor", reportData: [] }}
              />
              <DistrictGraph
                districtData={{ districtName: "Chitoor", reportData: [] }}
              />
            </div>
          ) : (
            <MainbarErrorMessage message="No schools found." />
          )
        ) : (
          <Loading message="Loading schools..." />
        )}
      </div>
    </>
  );
};

export default DistrictWiseReport;
