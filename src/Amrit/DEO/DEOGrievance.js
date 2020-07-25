import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Add from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RateReviewIcon from "@material-ui/icons/RateReview";
import GrievanceActionDialog from "./GrievanceActionDialog";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import FlatList from "flatlist-react";
import { MainbarErrorMessage } from "../Components/MainbarComponent";
import { DEOContext } from "../Context/DEOContext";

function DEOListGrievance() {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { grievances } = useContext(DEOContext);

  const [grievanceDialogOpen, setGrievanceDialogOpen] = useState(false);

  return (
    <>
      <GrievanceActionDialog
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
            School Grievances
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {grievances && grievances.length > 0 ? (
          <FlatList
            list={grievances.sort((a, b) => (a.status > b.status ? -1 : 1))}
            renderItem={(g) => {
              return <GrievanceCard key={g.date} grievance={g} />;
            }}
            groupBy={(g) => `${g.status}`}
            groupSeparator={(group, idx, groupLabel) => (
              <div className="post-category">{groupLabel}</div>
            )}
            groupReversed
          />
        ) : (
          // grievances.map((g) => <GrievanceCard key={g.date} grievance={g} />)
          <MainbarErrorMessage message="No grievances found." />
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
        <div className="message italic">Category : {grievance.category}</div>
        <div className="message">{grievance.message}</div>
      </div>
      <div className="italic">{new Date(grievance.date).toDateString()}</div>
    </div>
  );
};

export default DEOListGrievance;
