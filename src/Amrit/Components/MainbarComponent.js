import React from "react";
import { CircularProgress, Tab } from "@material-ui/core";

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

export const Loading = ({ message }) => {
  return (
    <div className="container">
      <div className="content">
        <CircularProgress />
        <p>{message}</p>
      </div>
    </div>
  );
};

export const MainbarErrorMessage = ({ message }) => {
  return (
    <div className="container">
      <div className="content">
        <p>{message}</p>
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
