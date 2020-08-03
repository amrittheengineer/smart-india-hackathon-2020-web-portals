import React, { useContext, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import RateReviewIcon from "@material-ui/icons/RateReview";
import Rating from "@material-ui/lab/Rating";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import { Button } from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import { TeacherContext } from "../Context/TeacherContext";

const PublicHome = () => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { feedbackList } = useContext(TeacherContext);

  const [viewReview, setViewReview] = useState(null);

  return (
    <>
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
            Student Feedback
          </Typography>
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
            <MainbarErrorMessage message="No feedbacks found" />
          )
        ) : (
          <Loading message="Loading feebacks..." />
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
      </div>
      <div className="italic">{new Date(review.date).toDateString()}</div>
    </div>
  );
};

export default PublicHome;
// export default TeacherReview;
