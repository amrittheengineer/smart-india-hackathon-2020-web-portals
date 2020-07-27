import React, { useState, useEffect, useContext, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { Loading } from "../Components/MainbarComponent";
import { TextField } from "@material-ui/core";
import { SchoolContext } from "../Context/SchoolContext";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { grievanceCategories } from "../Constants";

function SimpleSelect({ categoryRef }) {
  return (
    <div>
      <FormControl variant="outlined" className="modal-input">
        <InputLabel>Category</InputLabel>
        <Select
          autoFocus
          inputRef={categoryRef}
          defaultValue={grievanceCategories[0]}
          label="Category"
        >
          {grievanceCategories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const CreateGrievanceDialog = ({ visible, closeThis }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  const { reportGrievance } = useContext(SchoolContext);
  const { showToast } = useContext(GlobalStateContext);
  const inputMessageRef = useRef(null);
  const inputSubjectRef = useRef(null);
  const inputCategoryRef = useRef(null);

  useEffect(() => {}, []);
  return (
    <>
      <Dialog open={visible} maxWidth="sm" fullWidth>
        <DialogTitle>New Grievance</DialogTitle>
        <DialogContent>
          {requestingAPI ? (
            <Loading message="Reporting to DEO..." />
          ) : (
            <div>
              <SimpleSelect categoryRef={inputCategoryRef} />
              <TextField
                label="Subject"
                variant="outlined"
                inputRef={(inp) => (inputSubjectRef.current = inp)}
                className="modal-input"
              />
              <TextField
                label="Ask your Grievance"
                variant="outlined"
                multiline={true}
                inputProps={{ style: { minHeight: "80px" } }}
                inputRef={(inp) => (inputMessageRef.current = inp)}
                //   inputRef={(input) => (inputMessageRef.current = input)}
                className="modal-input"
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
              const subject = inputSubjectRef.current.value.trim();
              const category = inputCategoryRef.current.value.trim();
              if (!category) {
                return showToast("Please choose the category.");
              }
              if (!subject) {
                return showToast("Please give a subject of grievance.");
              }
              if (!message) {
                return showToast("Kindly brief your complaint.");
              }

              setRequestingAPI(true);

              reportGrievance(category, message, subject, () => {
                closeThis();
                setRequestingAPI(false);
              });
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
export default CreateGrievanceDialog;
