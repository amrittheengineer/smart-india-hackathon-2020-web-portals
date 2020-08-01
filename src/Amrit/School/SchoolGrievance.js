import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Add from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CreateGrievanceDialog from "./CreateGrievanceDialog";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import FlatList from "flatlist-react";
import { MainbarErrorMessage } from "../Components/MainbarComponent";
import { SchoolContext } from "../Context/SchoolContext";

function SchoolListGrievance() {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { grievances } = useContext(SchoolContext);

  const [grievanceDialogOpen, setGrievanceDialogOpen] = useState(false);

  return (
    <>
      <CreateGrievanceDialog
        visible={grievanceDialogOpen}
        closeThis={() => setGrievanceDialogOpen(false)}
      />
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
          <Typography variant="h6" className={classes.title}>
            Our School Grievances
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {
              setGrievanceDialogOpen(true);
            }}
            startIcon={<Add />}
            size="small"
          >
            New Grievance
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {grievances && grievances.length > 0 ? (
          <FlatList
            list={grievances.sort((a, b) => (a.status > b.status ? -1 : 1))}
            renderItem={(g) => {
              return <GrievanceCard key={g.GrievanceId} grievance={g} />;
            }}
            groupBy={(g) => `${g.status}`}
            groupSeparator={(group, idx, groupLabel) => (
              <div className="post-category">{groupLabel}</div>
            )}
          />
        ) : (
          // grievances.map((g) => <GrievanceCard key={g.date} grievance={g} />)
          <MainbarErrorMessage message="No requirements found." />
        )}
      </div>
    </>
  );
}

export const GrievanceCard = ({ grievance }) => {
  return (
    <div className="message-container">
      <div className="message-icon">
        <RateReviewIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{grievance.subject}</div>
        <div className="message">{grievance.message}</div>
      </div>
      <div className="italic">{new Date(grievance.date).toDateString()}</div>
    </div>
  );
};

export default SchoolListGrievance;
