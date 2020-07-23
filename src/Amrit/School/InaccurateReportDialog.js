import React, { useState, useEffect, useContext, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { Loading } from "../Components/MainbarComponent";
import { TextField } from "@material-ui/core";
import { SchoolContext } from "../Context/SchoolContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function CheckboxesGroup({ categories, selected }) {
  const classes = useStyles();
  const selectedCategories = useRef([...selected] || []);

  const handleTickEvent = (event) => {
    if (event.target.checked) {
      selectedCategories.current.push(event.target.name);
    } else {
      selectedCategories.current.filter((d) => d !== event.target.name);
    }
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Choose the category</FormLabel>
        <FormGroup>
          {categories.map((c) => (
            <FormControlLabel
              key={c}
              control={
                <Checkbox
                  defaultChecked={selectedCategories.current.includes(c)}
                  onChange={handleTickEvent}
                  name={c}
                />
              }
              label={c}
            />
          ))}
          <FormControlLabel
            key={"Other"}
            control={
              <Checkbox
                defaultChecked={selectedCategories.current.includes("Other")}
                onChange={handleTickEvent}
                name="Other"
              />
            }
            label="Other"
          />
        </FormGroup>
        <FormHelperText>Atleast one</FormHelperText>
      </FormControl>
    </div>
  );
}

const InaccurateReportDialog = ({ visible, closeThis, categories }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  const { inAccurateReport } = useContext(SchoolContext);
  useEffect(() => {}, []);
  return (
    <>
      <Dialog open={visible} maxWidth="sm" fullWidth>
        <DialogTitle>Not Satisified?</DialogTitle>
        <DialogContent>
          {requestingAPI ? (
            <Loading message="Reporting to DEO..." />
          ) : (
            <div>
              <TextField
                id="outlined-basic"
                label="Complaint in brief"
                variant="outlined"
                multiline={true}
                defaultValue={(() => {
                  if (inAccurateReport && inAccurateReport.message) {
                    return inAccurateReport.message;
                  }
                  return "";
                })()}
                autoFocus
                //   inputRef={(input) => (inputMessageRef.current = input)}
                className="modal-input"
              />
              {visible ? (
                <CheckboxesGroup
                  categories={categories || []}
                  selected={inAccurateReport ? inAccurateReport.categories : []}
                />
              ) : null}
            </div>
          )}
        </DialogContent>
        <DialogActions style={requestingAPI ? { display: "none" } : {}}>
          <Button onClick={closeThis} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setRequestingAPI(true);
              //   closeThis();
            }}
            color="primary"
          >
            {inAccurateReport ? "Update" : "Report"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default InaccurateReportDialog;
