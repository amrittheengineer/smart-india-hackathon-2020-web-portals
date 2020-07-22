import React from "react";
import { CircularProgress } from "@material-ui/core";

const Spinner = () => {
  return (
    <div style={{ display: "flex", marginBottom: "16px" }}>
      <CircularProgress color="primary" style={{ margin: "auto" }} />
    </div>
  );
};
export default Spinner;
