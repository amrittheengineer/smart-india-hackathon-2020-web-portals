import React, { useContext, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import QRCode from "react-qr-code";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { SchoolContext } from "../Context/SchoolContext";
import { appUrl } from "../Constants";
import { Loading, MainbarErrorMessage } from "../Components/MainbarComponent";
import { Paper } from "@material-ui/core";

function SchoolQRCode() {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const [qrCodeComponent, setQrCodeComponent] = useState(
    <Loading message="Loading QR Code" />
  );
  const { schoolDetails } = useContext(SchoolContext);

  const [meoDetails, setMeoDetails] = useState(null);

  useEffect(() => {
    let unmounted = false;
    if (schoolDetails && schoolDetails.geoHash) {
      setQrCodeComponent(<QRCodeWithVisit geoHash={schoolDetails.geoHash} />);

      fetch(`${appUrl}/school/getMeoDetails/${schoolDetails.mId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setMeoDetails(res);
          }
        })
        .catch((err) => console.log(err));
    }
    // getQrCode()
    //   .then((visit) => {
    //     setTimeout(() => {
    //       if (!unmounted) setQrCodeComponent(<QRCodeWithVisit visit={visit} />);
    //     }, 1000);
    //   })
    //   .catch((err) => {
    //     setTimeout(() => {
    //       if (!unmounted)
    //         setQrCodeComponent(
    //           <MainbarErrorMessage
    //             message={
    //               err === NO_PENDING_VISITS
    //                 ? "No pending visits are there for today!"
    //                 : "Something went wrong!"
    //             }
    //           />
    //         );
    //     }, 1000);
    //   });
    return () => {
      unmounted = true;
    };
  }, [schoolDetails]);

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
          <Typography variant="h6" noWrap>
            Visitor Authentication
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        <div className="meo-details">
          {qrCodeComponent}
          {meoDetails ? (
            <Paper variant="outlined" className="profile-container">
              <img
                src={meoDetails.imageUrl}
                color="primary"
                className="profile-avatar"
              />
              {/* <div className="profile-entity-container"> */}
              <ProfileEntity name="Name" value={`${meoDetails.userId}`} />
              <ProfileEntity
                name="Mandal Name"
                value={`${meoDetails.mandalName}`}
              />
              {/* </div> */}
            </Paper>
          ) : (
            <Loading message="Loading Visitor details..." />
          )}
        </div>
      </div>
    </>
  );
}

export const ProfileEntity = ({ name, value }) => {
  return (
    <Paper variant="outlined" className="profile-entity-holder">
      <div className="profile-entity">{`${name}: `}</div>
      <div className="profile-entity">{`${value}`}</div>
    </Paper>
  );
};

const QRCodeWithVisit = ({ geoHash }) => {
  return (
    <div className="container">
      <div className="content">
        <QRCode value={geoHash} />
      </div>
    </div>
  );
};

export default SchoolQRCode;
