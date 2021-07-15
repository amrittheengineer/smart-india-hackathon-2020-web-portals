import React, { useContext, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import { DistrictGraph } from "../Components/DistrictGraph";
import { appUrl } from "../Constants";

const DistrictWiseReportPublic = (props) => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);

  const [districtData, setDistrictData] = useState(null);

  useEffect(() => {
    fetch(`${appUrl}/deo/getDistrictWiseReport`)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setDistrictData(res[0].data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="mainbar-content">
        {districtData ? (
          districtData.length > 0 ? (
            <div className="district-graph-container">
              {districtData.map((d) => (
                <DistrictGraph key={d.districtName} districtData={d} />
              ))}
            </div>
          ) : (
            <MainbarErrorMessage message="No districts found." />
          )
        ) : (
          <Loading message="Loading district data..." />
        )}
      </div>
    </>
  );
};

export default DistrictWiseReportPublic;
