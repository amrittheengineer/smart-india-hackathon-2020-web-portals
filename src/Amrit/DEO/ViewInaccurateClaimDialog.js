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

const ViewInaccurateClaimDialog = ({ visible, closeThis, inaccurateClaim }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  // const { reportGrievance } = useContext(SchoolContext);
  const { showToast } = useContext(GlobalStateContext);
  const { getSchoolName } = useContext(DEOContext);
  const inputMessageRef = useRef(null);
  const inputSubjectRef = useRef(null);
  const inputCategoryRef = useRef(null);

  useEffect(() => {}, []);
  return (
    <>
      <Dialog open={inaccurateClaim !== null} maxWidth="sm" fullWidth>
        <DialogTitle>Inaccurate Claim</DialogTitle>
        <DialogContent>
          {inaccurateClaim === null ? null : (
            <div>
              <Paper variant="outlined" style={{ padding: "16px" }}>
                <Typography variant="h5" color="textPrimary">
                  {`Claimed on : ${new Date(
                    inaccurateClaim.complaintDate
                  ).toDateString()}`}
                </Typography>
                <div
                  style={{
                    padding: "8px 0",
                    //   borderRadius: "12px",
                  }}
                >
                  <div style={{ display: "inline" }}>Categories : </div>
                  {inaccurateClaim.categories
                    ? inaccurateClaim.categories.map((r, i) => (
                        <Chip
                          color={
                            // reportEstimate[r] > parameterEstimateWarningThreshold
                            //   ?
                            // "primary"
                            //   :
                            "secondary"
                          }
                          variant="outlined"
                          key={r}
                          label={r}
                          className="category-indicator"
                        />
                      ))
                    : null}
                </div>
                <Paper
                  variant="outlined"
                  style={{
                    padding: "16px",
                    //   background: "#f50057",
                    background: "#3f51b5",
                  }}
                >
                  <Typography
                    style={{
                      color: "#fff",
                    }}
                    variant="body1"
                  >
                    {inaccurateClaim.message}
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
                  {` - ${getSchoolName(inaccurateClaim.schoolId)}`}
                </Typography>
              </Paper>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeThis} color="primary">
            Close
          </Button>
          {/* <Button
            onClick={() => {
              // console.log(inputMessageRef.current);
              // return;
              const message = inputMessageRef.current.value.trim();
              const subject = inputSubjectRef.current.value.trim();
              const category = inputCategoryRef.current.value.trim();
              if (!category) {
                return showToast("Please choose the category.");
              }
              if (!subject) {
                return showToast("Please give a subject of grievance.");
              }
              if (!message) {
                return showToast("Kindly brief your complaint.");
              }

              setRequestingAPI(true);

              // reportGrievance(category, message, subject, () => {
              //   closeThis();
              //   setRequestingAPI(false);
              // });
            }}
            color="primary"
          >
            Report
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ViewInaccurateClaimDialog;
