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
import { TeacherContext } from "../Context/TeacherContext";
import { appUrl } from "../Constants";

const GeneralPosts = () => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { feedbackList } = useContext(TeacherContext);

  const [viewReview, setViewReview] = useState(null);

  const [gposts, setGPosts] = useState(null);

  useEffect(() => {
    fetch(`${appUrl}/student/getNotifications`)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setGPosts(res[0].data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
            AP-AMS Notifications
          </Typography>
          {/* <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setReportDialogOpen(true);
            }}
            size="small"
          >
            {inAccurateReport ? "View Complaint" : "Claim Inaccurate"}
          </Button> */}
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {gposts ? (
          gposts.length > 0 ? (
            gposts.map((review, ind) => {
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

export const ReviewCard = ({ review }) => {
  return (
    <div className="message-container">
      <div className="message-icon">
        <RateReviewIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{review.title}</div>
        <div className="message">{review.message}</div>
      </div>
    </div>
  );
};

export default GeneralPosts;
// export default TeacherReview;
