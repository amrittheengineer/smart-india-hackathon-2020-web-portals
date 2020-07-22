import React from "react";
import { CircularProgress } from "@material-ui/core";

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

export const Loading = () => {
  return (
    <div className="container">
      <div className="content">
        <CircularProgress />
        <div>Loading</div>
      </div>
    </div>
  );
};

export const MainbarErrorMessage = ({ message }) => {
  return (
    <div className="container">
      <div className="content">
        <div>{message}</div>
      </div>
    </div>
  );
};
