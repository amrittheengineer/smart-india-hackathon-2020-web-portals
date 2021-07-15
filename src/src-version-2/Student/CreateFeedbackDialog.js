import React, { useState, useEffect, useContext, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Rating from "@material-ui/lab/Rating";
import { Loading } from "../Components/MainbarComponent";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { SchoolContext } from "../Context/SchoolContext";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { StudentContext } from "../Context/StudentContext";

function SelectTeacher({ teacherRef }) {
  const { teachersList } = useContext(StudentContext);
  return (
    <div>
      <FormControl variant="outlined" className="modal-input">
        <InputLabel>Teacher</InputLabel>
        <Select
          autoFocus
          inputRef={teacherRef}
          defaultValue=""
          label="Select Teacher"
        >
          {teachersList !== null
            ? teachersList.map((c) => (
                <MenuItem key={c.teacherId} value={c.teacherId}>
                  {c.name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </div>
  );
}

const CreateFeedbackDialog = ({ visible, closeThis }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  const [isAnonymous, setAnonymous] = useState(false);
  const [rating, setRating] = useState(0);
  const { reportFeedback } = useContext(StudentContext);
  const { showToast } = useContext(GlobalStateContext);
  const inputMessageRef = useRef(null);
  const inputSubjectRef = useRef(null);
  const teacherRef = useRef(null);

  return (
    <>
      <Dialog open={visible} maxWidth="md" fullWidth>
        <DialogTitle>New Feedback</DialogTitle>
        <DialogContent>
          {requestingAPI ? (
            <Loading message="Sending to Teacher..." />
          ) : (
            <div>
              <SelectTeacher teacherRef={teacherRef} />

              <FormControlLabel
                control={
                  <Checkbox
                    name="Anonymous"
                    onChange={(e) => {
                      setAnonymous(e.target.checked);
                    }}
                    color="primary"
                  />
                }
                label="Anonymous"
              />

              <TextField
                label="Title"
                variant="outlined"
                inputRef={(inp) => (inputSubjectRef.current = inp)}
                className="modal-input"
              />
              <TextField
                label="Give your Feedback"
                variant="outlined"
                multiline={true}
                inputProps={{ style: { minHeight: "80px" } }}
                inputRef={(inp) => (inputMessageRef.current = inp)}
                className="modal-input"
              />
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                  console.log(newValue);
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions style={requestingAPI ? { display: "none" } : {}}>
          <Button onClick={closeThis} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // console.log(inputMessageRef.current);
              // return;
              const message = inputMessageRef.current.value.trim();
              const title = inputSubjectRef.current.value.trim();
              const teacher = teacherRef.current.value.trim();
              // const category = inputCategoryRef.current.value.trim();
              // if (!category) {
              //   return showToast("Please choose the category.");
              // }
              if (!title) {
                return showToast("Please give a title for feedback.");
              }
              if (!message) {
                return showToast("Kindly brief your feedback.");
              }
              if (!teacher) {
                return showToast("Select any teacher.");
              }

              setRequestingAPI(true);

              reportFeedback(
                message,
                title,
                rating,
                teacher,
                isAnonymous,
                () => {
                  closeThis();
                  setRating(0);
                  setRequestingAPI(false);
                }
              );
            }}
            color="primary"
          >
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateFeedbackDialog;
