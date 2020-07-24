import React, { useContext, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { InfoOutlined } from "@material-ui/icons";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import {
  NO_REPORTS,
  colors,
  INDEX_OLD_REPORT,
  INDEX_NEW_REPORT,
} from "../Constants";
import { SchoolContext } from "../Context/SchoolContext";
import { Button } from "@material-ui/core";
import InaccurateReportDialog from "./InaccurateReportDialog";
import { AuthContext } from "../Context/AuthContext";

const SchoolRemark = () => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { inAccurateReport, latestReport, labels } = useContext(SchoolContext);

  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  return (
    <>
      <InaccurateReportDialog
        visible={reportDialogOpen}
        closeThis={() => setReportDialogOpen(false)}
        categories={labels}
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
            Report Remarks
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setReportDialogOpen(true);
            }}
            size="small"
          >
            {inAccurateReport ? "View Complaint" : "Claim Inaccurate"}
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {latestReport && latestReport.remarks ? (
          latestReport.remarks.length > 0 ? (
            latestReport.remarks.map((remark, ind) => {
              return <RemarkCard remark={remark} key={ind} />;
            })
          ) : (
            <Loading message="Loading remarks..." />
          )
        ) : (
          <MainbarErrorMessage message="No remarks found" />
        )}
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
        <div className="posted-by">{remark.categoryName || "Admin"}</div>
        <div className="message">{remark.message}</div>
      </div>
    </div>
  );
};

export default SchoolRemark;
