import React, { useContext, useEffect, useState, useRef } from "react";
import { Line, HorizontalBar } from "react-chartjs-2";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import {
  colors,
  INDEX_OLD_REPORT,
  INDEX_NEW_REPORT,
  parameterEstimateWarningThreshold,
} from "../Constants";
import { useParams } from "react-router-dom";
import { DEOContext } from "../Context/DEOContext";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

const ViewReportGraph = ({ history }) => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { reportId } = useParams();

  const { labels, latestReportChart, setVisitId } = useContext(DEOContext);

  useEffect(() => {
    setVisitId(reportId);
  }, [reportId]);

  const chartRef = useRef(null);

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
            Visit Report
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content view-report">
        {labels ? (
          labels.length > 0 && latestReportChart ? (
            <div className="visit-report-page">
              <div className="graph">
                <HorizontalBar
                  ref={chartRef}
                  data={{
                    datasets: [
                      {
                        fill: colors[1],
                        data: latestReportChart,
                        type: "horizontalBar",
                        backgroundColor: latestReportChart.map((l) =>
                          l < parameterEstimateWarningThreshold
                            ? colors[0]
                            : colors[1]
                        ),
                        borderColor: colors[1],
                      },
                    ],
                    labels,
                  }}
                  options={{
                    scales: {
                      xAxes: [
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
                            display: false,
                          },
                          scaleLabel: {
                            display: true,
                            labelString: "Percentage",
                          },
                        },
                      ],
                      yAxes: [
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
                          return `${item.xLabel}%`;
                        },
                      },
                    },
                    maintainAspectRatio: false,
                    legend: {
                      display: false,
                    },
                  }}
                />
              </div>
              <Paper className="data-list-container" variant="outlined">
                <Typography variant="h5">Report Data</Typography>
                <DataReportOfVisit visitId={reportId} />
              </Paper>
            </div>
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

const DataReportOfVisit = ({ visitId }) => {
  const [dataReports, setDataReports] = useState({});
  const { getVisitDataReportOf } = useContext(DEOContext);
  const { getDataQuestions } = useContext(GlobalStateContext);
  useEffect(() => {
    if (visitId) {
      const visitRaw = getVisitDataReportOf(visitId);
      if (visitRaw) {
        const data_questions_categories = getDataQuestions(visitRaw);
        setDataReports(data_questions_categories);
        console.log(data_questions_categories);
      }
    }
  }, [visitId]);
  return (
    <>
      {Object.keys(dataReports).map((r) => (
        <Accordion
          key={r}
          variant="outlined"
          className="category-data-accordion"
          defaultExpanded
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary aria-controls="panel1d-content">
            <Typography>{r}</Typography>
          </AccordionSummary>
          <AccordionDetails className="data-list">
            {dataReports[r].map((q) => (
              <Card
                key={q.question}
                style={{ width: "100%" }}
                variant="outlined"
              >
                <CardContent>
                  <Typography variant="caption">{q.question}</Typography>
                  <Typography variant="h5">{q.answer}</Typography>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default ViewReportGraph;
