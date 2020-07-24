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
import { GlobalStateContext } from "../Context/GlobalStateContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function CheckboxesGroup({ categories, selected, selectedCategories }) {
  const classes = useStyles();

  const handleTickEvent = (event) => {
    if (event.target.checked) {
      selectedCategories.current.push(event.target.name);
    } else {
      selectedCategories.current = selectedCategories.current.filter(
        (d) => d !== event.target.name
      );
    }
  };

  useEffect(() => {
    selectedCategories.current = [...selected];
  }, [selected]);

  return (
    <div className={classes.root}>
      <FormControl
        disabled={!!selected.length}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Choose the category</FormLabel>
        <FormGroup>
          {categories.map((c) => (
            <FormControlLabel
              key={c}
              control={
                <Checkbox
                  defaultChecked={selected.includes(c)}
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
                defaultChecked={selected.includes("Other")}
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
  const { inAccurateReport, reportInaccurate } = useContext(SchoolContext);
  const { showToast } = useContext(GlobalStateContext);
  const selectedCategories = useRef(
    inAccurateReport ? [...inAccurateReport.categories] : []
  );
  const inputMessageRef = useRef(null);

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
              {visible ? (
                <CheckboxesGroup
                  categories={categories || []}
                  selected={inAccurateReport ? inAccurateReport.categories : []}
                  selectedCategories={selectedCategories}
                />
              ) : null}
              <TextField
                id="outlined-basic"
                label="Complaint in brief"
                variant="outlined"
                multiline={true}
                inputProps={{ style: { height: "80px" } }}
                inputRef={inputMessageRef}
                disabled={!!inAccurateReport}
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
            </div>
          )}
        </DialogContent>
        <DialogActions style={requestingAPI ? { display: "none" } : {}}>
          <Button onClick={closeThis} color="primary">
            {inAccurateReport ? "Close" : `Cancel`}
          </Button>
          <Button
            style={inAccurateReport ? { display: "none" } : {}}
            onClick={() => {
              const message = inputMessageRef.current.value.trim();
              if (!message) {
                return showToast("Kindly brief your complaint.");
              }
              if (selectedCategories.current.length === 0) {
                return showToast("Please choose category.");
              }

              setRequestingAPI(true);

              reportInaccurate(message, selectedCategories.current, () => {
                closeThis();
                setRequestingAPI(false);
              });
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
