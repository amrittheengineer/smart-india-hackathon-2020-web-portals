import React, { useContext, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import RateReviewIcon from "@material-ui/icons/RateReview";
import Add from "@material-ui/icons/Add";
import Rating from "@material-ui/lab/Rating";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import { Button } from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import CreateFeedbackDialog from "./CreateFeedbackDialog";
import { StudentContext } from "../Context/StudentContext";
import ViewReviewDialog from "./ViewReviewDialog";

const StudentFeedback = () => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { feedbackList } = useContext(StudentContext);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewReview, setViewReview] = useState(null);

  return (
    <>
      <CreateFeedbackDialog
        visible={createDialogOpen}
        closeThis={() => setCreateDialogOpen(false)}
      />
      <ViewReviewDialog
        review={viewReview}
        closeThis={() => setViewReview(null)}
      />
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
            My Feedbacks
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setCreateDialogOpen(true);
            }}
            startIcon={<Add />}
            size="small"
          >
            New Feeback
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {feedbackList ? (
          feedbackList.length > 0 ? (
            feedbackList.map((review, ind) => {
              return (
                <ReviewCard
                  review={review}
                  key={ind}
                  onClick={() => setViewReview(review)}
                />
              );
            })
          ) : (
            <MainbarErrorMessage message="No remarks found" />
          )
        ) : (
          <Loading message="Loading feecbacks..." />
        )}
      </div>
    </>
  );
};

export const ReviewCard = ({ review, onClick }) => {
  return (
    <div className="message-container" onClick={onClick}>
      <div className="message-icon">
        <RateReviewIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{review.subject}</div>
        <div className="message">
          <Rating name="read-only" value={review.rating} readOnly />
        </div>
        <div className="message">To: {review.teacherName || "Mr. Janul"}</div>
      </div>
      <div className="italic">
        {new Date(review.date || Date.now()).toDateString()}
      </div>
    </div>
  );
};

export default StudentFeedback;
