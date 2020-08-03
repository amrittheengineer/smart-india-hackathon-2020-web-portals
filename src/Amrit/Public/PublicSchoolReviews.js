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
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import { TeacherContext } from "../Context/TeacherContext";
import { appUrl } from "../Constants";
import { SchoolGraph } from "../Components/DistrictGraph";

function SelectTeacher({ setState, selectList, category }) {
  return (
    <div className="modal-input">
      <FormControl variant="outlined" className="modal-input">
        <InputLabel>{category}</InputLabel>
        <Select
          autoFocus
          // defaultValue={}
          onChange={(e) => (setState ? setState(e.target.value) : null)}
          label={category}
        >
          {selectList !== null
            ? selectList.map((c) => (
                <MenuItem key={c.name} value={c.index}>
                  {c.name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </div>
  );
}

const PublicSchoolReviews = () => {
  const { classes, handleDrawerToggle, schools, districts } = useContext(
    GlobalStateContext
  );

  const [viewReview, setViewReview] = useState(null);

  const [reviews, setreviews] = useState(null);
  const [currentSchool, setCurrentSchool] = useState(null);

  useEffect(() => {
    fetch(`${appUrl}/student/getPublicReviews`)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setreviews(res[0].data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
            School Reviews
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {reviews ? (
          reviews.length > 0 ? (
            <>
              <SelectTeacher
                category={"District"}
                selectList={reviews.map((r, ind) => ({
                  name: `${districts[ind]}`,
                  value: r._id,
                  index: ind,
                }))}
              />
              <SelectTeacher
                setState={setCurrentSchool}
                category={"School"}
                selectList={reviews.map((r, ind) => ({
                  name: `${schools[ind]} - ${districts[ind]}`,
                  value: r._id,
                  index: ind,
                }))}
              />
            </>
          ) : (
            <MainbarErrorMessage message="No institutes found" />
          )
        ) : (
          <Loading message="Loading reviews..." />
        )}
        {currentSchool ? (
          <>
            <div className="post-category">About School</div>
            <div className="district-graph-container">
              <SchoolGraph
                districtData={{
                  districtName: schools[currentSchool],
                  reportData: reviews[currentSchool].ratings,
                }}
              />
            </div>
            <div className="post-category">Reviews</div>
            {reviews[currentSchool].reviews.map((rrr) => (
              <ReviewCard review={rrr} key={rrr.title} />
            ))}
          </>
        ) : (
          <MainbarErrorMessage message="Select any school" />
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
        <div className="posted-by">{review.title}</div>
        <div className="message">{review.message}</div>
      </div>
      <div className="italic">{new Date().toDateString()}</div>
    </div>
  );
};

export default PublicSchoolReviews;
// export default TeacherReview;
