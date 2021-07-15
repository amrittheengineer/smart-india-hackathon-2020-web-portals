import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";
import { Paper, Typography } from "@material-ui/core";

const ViewReviewDialog = ({ closeThis, review }) => {
  return (
    <>
      <Dialog open={review !== null} maxWidth="sm" fullWidth>
        <DialogTitle>User Review</DialogTitle>
        <DialogContent>
          {review === null ? null : (
            <div>
              <Paper variant="outlined" style={{ padding: "16px" }}>
                <Typography variant="h5" color="textPrimary">
                  {`${review.subject}`}
                </Typography>

                <div
                  style={{
                    padding: "8px 0",
                  }}
                >
                  <Rating name="read-only" value={review.rating} readOnly />
                </div>
                <Paper
                  variant="outlined"
                  style={{
                    padding: "16px",
                    background: "#7d47bd",
                  }}
                >
                  <Typography
                    style={{
                      color: "#fff",
                    }}
                    variant="body1"
                  >
                    {review.message}
                  </Typography>
                </Paper>
                <Typography
                  style={{
                    padding: "8px 0",
                    fontStyle: "italic",
                  }}
                  variant="subtitle2"
                  color="textPrimary"
                  align="right"
                >
                  {` - ${review.userName}`}
                </Typography>
              </Paper>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeThis} color="primary" key="close">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ViewReviewDialog;
