import React, { useContext, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import Add from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import { DEOContext } from "../Context/DEOContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";

function ListMEO(props) {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);

  const { MEOList } = useContext(DEOContext);
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
          <Typography variant="h6" className={classes.title}>
            Visitors
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {}}
            startIcon={<Add />}
            size="small"
          >
            Add Visitor
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {MEOList ? (
          MEOList.length > 0 ? (
            MEOList.sort((a, b) => a.lastVisited > b.lastVisited).map((m) => (
              <MEOCard meo={m} key={m.mId} />
            ))
          ) : (
            // grievances.map((g) => <GrievanceCard key={g.date} grievance={g} />)
            <MainbarErrorMessage message="No Visitors found." />
          )
        ) : (
          <Loading message="Loading visitors..." />
        )}
      </div>
    </>
  );
}

const MEOCard = ({ meo }) => {
  const { getMEOName } = useContext(DEOContext);
  // const [name, setName] = useState("");

  // useEffect(() => {
  //   if (MEOList) {
  //     setName()
  //   }
  // } , [MEOList])

  return (
    <div className="message-container">
      <div className="message-icon">
        <AccountCircleIcon color="primary" />
      </div>
      <div className="message-body">
        <div className="posted-by">{`${meo.userId}` || "VVVVV"}</div>
        <div className="message italic">{`${meo.mandalName}`}</div>
        {/* <div className="message">
          <Button
            onClick={() => {
              setSchedulemeoId(meo.meoId);
            }}
            variant="outlined"
          >
            Schedule
          </Button>
        </div> */}
      </div>
      {/* <div className="italic">{`${meo.mandalName}`}</div> */}
    </div>
  );
};

export default ListMEO;
