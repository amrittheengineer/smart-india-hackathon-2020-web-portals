import React from "react";
import { CircularProgress, Tab } from "@material-ui/core";
import { parameterEstimateWarningThreshold } from "../Constants";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

export const EmptyComponent = () => {
  return (
    <div className="container">
      <div className="content">
        <img
          className="progress-image"
          src={require("../images/nothing.svg")}
          alt="Nothing Here"
        />
        <div>Nothing Here</div>
      </div>
    </div>
  );
};

export const FeedbackIndicator = ({ category, ...props }) => {
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

export const ReportIndicator = ({ category, oldValue, newValue, ...props }) => {
  return (
    <div className="indicator-card">
      <div className="indicator">
        <CircularProgressbarWithChildren
          value={newValue}
          styles={buildStyles({
            pathColor: "#f00",
            trailColor: "#eee",
            strokeLinecap: "butt",
          })}
          {...props}
        >
          <CircularProgressbar
            value={oldValue}
            styles={buildStyles(
              oldValue >= parameterEstimateWarningThreshold
                ? {
                    textColor: "#3f51b5",
                    pathColor: "#3f51b5",
                  }
                : { textColor: "#f50057", pathColor: "#f50057" }
            )}
            {...props}
          />
        </CircularProgressbarWithChildren>
        {/* <CircularProgressbar
          {...props}
          styles={buildStyles(
            props.value >= parameterEstimateWarningThreshold
              ? {
                  textColor: "#3f51b5",
                  pathColor: "#3f51b5",
                }
              : { textColor: "#f50057", pathColor: "#f50057" }
          )}
        /> */}
      </div>
      <div className="indicator-category">
        <h4 style={{ color: "#3f51b5" }}>{category}</h4>
        <h4
          style={Object.assign(
            props.value >= parameterEstimateWarningThreshold
              ? { color: "#3f51b5" }
              : { color: "#f50057" }
            // { display: "inline-block" }
          )}
        >
          {`${
            newValue - oldValue > 0
              ? `Improved ${newValue - oldValue}%`
              : oldValue - newValue > 0
              ? `Decreased ${oldValue - newValue}%`
              : "No Change"
          }`}
        </h4>
        {/* <h4
          style={
            newValue >= oldValue ? { color: "#3f51b5" } : { color: "#f50057" }
          }
        >
          {`${
            newValue - oldValue > 0
              ? `Improved ${newValue - oldValue}%`
              : newValue - oldValue < 0
              ? `Decreased ${oldValue - newValue}%`
              : "No Change"
          } - ${category}`}
        </h4> */}
      </div>
    </div>
  );
};

export const Loading = ({ message }) => {
  return (
    <div className="container">
      <div className="content">
        <CircularProgress />
        <p style={{ color: "#000" }}>{message}</p>
      </div>
    </div>
  );
};

export const MainbarErrorMessage = ({ message }) => {
  return (
    <div className="container">
      <div className="content">
        <p style={{ color: "#000" }}>{message}</p>
      </div>
    </div>
  );
};

export const LinkTab = (props) => {
  return (
    <Tab
      component="div"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};
export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return value === index ? children : null;
};
