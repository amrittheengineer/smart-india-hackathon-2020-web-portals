import React, { useContext, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import {
  NO_REPORTS,
  colors,
  INDEX_OLD_REPORTS,
  INDEX_NEW_REPORTS,
} from "../Constants";
import { SchoolContext } from "../Context/SchoolContext";

function SchoolReport() {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const [reportComponent, setReportComponent] = useState(
    <Loading message="Loading Report..." />
  );
  const { getSchoolReport } = useContext(SchoolContext);

  useEffect(() => {
    let unmounted = false;
    getSchoolReport()
      .then((reportsArray) => {
        const latestReport = reportsArray.sort((a, b) => a - b).splice(0, 1);

        const oldReportsAggregate = reportsArray;

        setTimeout(() => {
          if (!unmounted)
            setReportComponent(
              <Line
                data={{
                  datasets: [
                    {
                      fill: colors[1],
                      data: [8, 36, 36, 68, 64, 50, 43],
                      // type: "line",
                      backgroundColor: colors[1],
                      label: "New Report",
                      borderColor: colors[1],
                    },
                    {
                      // fill: false,
                      data: [28, 24, 32, 53, 68, 44, 90],
                      // type: "line",
                      label: "Old Reports",
                      backgroundColor: "#c1c1c1",
                      borderColor: "#c1c1c1",
                    },
                  ],
                  labels: [
                    "Library",
                    "Hygiene",
                    "Infrastructure",
                    "Teachers",
                    "Labs",
                    "Class Room",
                    "Academics",
                  ],
                }}
                legend={{
                  labels: {
                    fontColor: "#000",
                    fontSize: 16,
                    padding: 20,
                    fontStyle: "italic",
                  },
                  display: true,
                  position: "right",
                }}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          display: true,
                          beginAtZero: true,
                          callback: function (value, index, values) {
                            return value + "%";
                          },
                          max: 100,
                          min: 0,
                        },
                        gridLines: {
                          display: true,
                        },
                        scaleLabel: {
                          display: true,
                          labelString: "Percentage",
                        },
                      },
                    ],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          display: true,
                        },
                      },
                    ],
                  },
                  tooltips: {
                    callbacks: {
                      label: (item, data) => {
                        if (item.datasetIndex === INDEX_OLD_REPORTS) {
                        } else if (item.datasetIndex === INDEX_NEW_REPORTS) {
                          const oldReportsEntityValue =
                            data.datasets[INDEX_OLD_REPORTS][item.index];
                          const newReportsEntityValue =
                            data.datasets[INDEX_NEW_REPORTS][item.index];

                          // const total
                        }
                        return item.yLabel;
                      },
                    },
                  },
                }}
              />
            );
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          if (!unmounted)
            setReportComponent(
              <MainbarErrorMessage
                message={
                  err === NO_REPORTS
                    ? "No reports available"
                    : "Something went wrong!"
                }
              />
            );
        }, 1000);
      });
    return () => {
      unmounted = true;
    };
  }, []);

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
            Our School Report
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">{reportComponent}</div>
    </>
  );
}

export default SchoolReport;
