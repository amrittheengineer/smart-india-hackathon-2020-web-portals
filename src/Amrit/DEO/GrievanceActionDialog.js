import React, { useState, useEffect, useContext, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Loading } from "../Components/MainbarComponent";
import { Paper, Typography, Chip } from "@material-ui/core";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { DEOContext } from "../Context/DEOContext";

const GrievanceActionDialog = ({ closeThis, grievance }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  // const { reportGrievance } = useContext(SchoolContext);
  const { showToast } = useContext(GlobalStateContext);
  const { getSchoolName, acceptGrievance } = useContext(DEOContext);
  const inputMessageRef = useRef(null);
  const inputSubjectRef = useRef(null);
  const inputCategoryRef = useRef(null);

  useEffect(() => {}, []);
  return (
    <>
      <Dialog open={grievance !== null} maxWidth="sm" fullWidth>
        <DialogTitle>School Grievance</DialogTitle>
        <DialogContent>
          {grievance === null ? null : requestingAPI ? (
            <Loading message="Processing..." />
          ) : (
            <div>
              <Paper variant="outlined" style={{ padding: "16px" }}>
                <Typography variant="h5" color="textPrimary">
                  {`${grievance.subject}`}
                </Typography>

                <div
                  style={{
                    padding: "4px 0",
                  }}
                >
                  <div style={{ display: "inline" }}>Status : </div>
                  <Chip
                    color={
                      grievance.status === "Pending" ? "secondary" : "primary"
                    }
                    variant="outlined"
                    label={grievance.status}
                    className="category-indicator"
                  />
                </div>
                <Paper
                  variant="outlined"
                  style={{
                    padding: "16px",
                    //   background: "#f50057",
                    background: "#7d47bd",
                  }}
                >
                  <Typography
                    style={{
                      color: "#fff",
                    }}
                    variant="body1"
                  >
                    {grievance.message}
                  </Typography>
                </Paper>
                <Typography
                  style={{
                    padding: "8px 0",
                    fontStyle: "italic",
                    //   borderRadius: "12px",
                  }}
                  variant="subtitle2"
                  color="textPrimary"
                  align="right"
                >
                  {` - ${grievance.schoolName}`}
                </Typography>
                {/* <div
                  style={{
                    padding: "4px 0",
                  }}
                >
                  <div style={{ display: "inline" }}>Category : </div>
                  <Chip
                    color={
                      grievance.status === "Pending" ? "secondary" : "primary"
                    }
                    variant="outlined"
                    label={grievance.category}
                    className="category-indicator"
                  />
                </div> */}
              </Paper>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {!requestingAPI ? (
            <>
              <Button onClick={closeThis} color="primary" key="close">
                Close
              </Button>
              {grievance !== null && grievance.status === "Pending" ? (
                <Button
                  key="complete"
                  onClick={() => {
                    setRequestingAPI(true);

                    acceptGrievance(grievance.GrievanceId, () => {
                      setRequestingAPI(false);
                      closeThis();
                    });
                  }}
                  color="primary"
                >
                  Complete
                </Button>
              ) : null}
            </>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
};
export default GrievanceActionDialog;
