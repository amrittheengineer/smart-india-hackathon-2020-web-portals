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
  INDEX_OLD_REPORT,
  INDEX_NEW_REPORT,
} from "../Constants";
import { SchoolContext } from "../Context/SchoolContext";
import { Button } from "@material-ui/core";
import InaccurateReportButton from "../../Components/InaccurateReportButton";
import InaccurateReportDialog from "./InaccurateReportDialog";
import { AuthContext } from "../Context/AuthContext";

const SchoolReport = ({ history }) => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { labels, latestReportChart, previousReportChart } = useContext(
    SchoolContext
  );
  const { isDEO } = useContext(AuthContext);

  return (
    <>
      {/* <InaccurateReportButton /> */}
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
          <Typography variant="h6" noWrap className={classes.title}>
            Our School Report
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {
              console.log(isDEO);
              history.push(isDEO ? "" : "/school/reports/remarks");
            }}
            size="small"
            // style={{ marginRight: "24px" }}
          >
            View Remarks
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {labels ? (
          labels.length > 0 ? (
            <Bar
              data={{
                datasets: [
                  {
                    // fill: false,
                    data: previousReportChart,
                    type: "bar",
                    label: "Old Report",
                    backgroundColor: "#c1c1c1",
                    borderColor: "#c1c1c1",
                  },
                  {
                    fill: colors[1],
                    data: latestReportChart,
                    type: "bar",
                    backgroundColor: colors[1],
                    label: "New Report",
                    borderColor: colors[1],
                  },
                ],
                labels,
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
                      if (item.datasetIndex === INDEX_OLD_REPORT) {
                        return `Old Report - ${item.yLabel}%`;
                      } else if (item.datasetIndex === INDEX_NEW_REPORT) {
                        const change =
                          data.datasets[INDEX_NEW_REPORT].data[item.index] -
                          data.datasets[INDEX_OLD_REPORT].data[item.index];
                        // const total
                        return `${item.yLabel}% - ${
                          change > 0
                            ? `Increased ${change}%`
                            : change < 0
                            ? `Decreased ${-change}%`
                            : "No Change"
                        }`;
                      }
                      return item.yLabel;
                    },
                  },
                },
              }}
            />
          ) : (
            <Loading message="Loading reports..." />
          )
        ) : (
          <MainbarErrorMessage message="No reports found" />
        )}
      </div>
    </>
  );
};

export default SchoolReport;
