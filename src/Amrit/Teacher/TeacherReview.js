import React, { useContext, useEffect, useState, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import { Button } from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { parameterEstimateWarningThreshold } from "../Constants";
import { InfoOutlined } from "@material-ui/icons";
import { TeacherContext } from "../Context/TeacherContext";

const TeacherReview = ({ history }) => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { latestReportChart, remarks } = useContext(TeacherContext);

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
            Visitor Review
          </Typography>
          {/* <Button
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
          </Button> */}
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {latestReportChart && remarks ? (
          <>
            <div className="indicator-list">
              {/* <CircularProgressbar value={80} text={`${80}%`} /> */}
              {latestReportChart
                ? Object.keys(latestReportChart).map((c) => (
                    <FeedbackIndicator
                      category={c}
                      value={latestReportChart[c]}
                      text={`${latestReportChart[c]}%`}
                      strokeWidth={5}
                      key={c}
                    />
                  ))
                : null}
            </div>
            <hr style={{ border: "2px solid #ddd" }} />
            <div className="post-category">Remarks</div>
            <div className="remark-list">
              {remarks &&
                remarks.map((remark) => (
                  <RemarkCard remark={remark} key={remark.id + Math.random()} />
                ))}
            </div>
          </>
        ) : (
          <Loading message="Loading reports..." />
        )}
      </div>
    </>
  );
};

export const RemarkCard = ({ remark }) => {
  return (
    <div className="message-container">
      <div className="message-icon">
        <InfoOutlined color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{remark.categoryName || "Remark"}</div>
        <div className="message">{remark.message}</div>
      </div>
    </div>
  );
};

const FeedbackIndicator = ({ category, ...props }) => {
  return (
    <div className="indicator-card">
      <div className="indicator">
        <CircularProgressbar
          {...props}
          styles={buildStyles(
            props.value >= parameterEstimateWarningThreshold
              ? {
                  textColor: "#3f51b5",
                  pathColor: "#3f51b5",
                  // trailColor: "gold",
                }
              : { textColor: "#f50057", pathColor: "#f50057" }
          )}
        />
      </div>
      <div className="indicator-category">
        <h4
          style={
            props.value >= parameterEstimateWarningThreshold
              ? { color: "#3f51b5" }
              : { color: "#f50057" }
          }
        >
          {category}
        </h4>
      </div>
    </div>
  );
};

export default TeacherReview;
