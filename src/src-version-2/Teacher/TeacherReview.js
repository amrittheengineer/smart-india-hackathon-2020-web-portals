import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { Loading, FeedbackIndicator } from "../Components/MainbarComponent";
import "react-circular-progressbar/dist/styles.css";
import { InfoOutlined } from "@material-ui/icons";

import { TeacherContext } from "../Context/TeacherContext";

const TeacherReview = ({ history }) => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { remarks, reportChart } = useContext(TeacherContext);

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
            Visitor Review
          </Typography>
          {/* <Button
            color="inherit"
            variant="outlined"
            onClick={() => {
              console.log(isDEO);
              history.push(isDEO ? "" : "/school/reports/remarks");
            }}
            size="small"
            // style={{ marginRight: "24px" }}
          >
            View Remarks
          </Button> */}
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        <>
          <div className="indicator-list">
            {/* <CircularProgressbar value={80} text={`${80}%`} /> */}
            {reportChart ? (
              Object.keys(reportChart).map((c) => (
                <FeedbackIndicator
                  category={c}
                  value={reportChart[c]}
                  text={`${reportChart[c]}%`}
                  strokeWidth={5}
                  key={c}
                />
              ))
            ) : (
              <Loading message="Loading score..." />
            )}
          </div>
          {/* <hr style={{ border: "2px solid #ddd" }} /> */}
          <div className="post-category">Remarks</div>
          {remarks ? (
            remarks.map((remark) => (
              <RemarkCard remark={remark} key={remark.id + Math.random()} />
            ))
          ) : (
            <Loading message="Loading remarks..." />
          )}
        </>
      </div>
    </>
  );
};

export const RemarkCard = ({ remark }) => {
  return (
    <div className="message-container">
      <div className="message-icon">
        <InfoOutlined color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{remark.categoryName || "Remark"}</div>
        <div className="message">{remark.message}</div>
      </div>
    </div>
  );
};

export default TeacherReview;
