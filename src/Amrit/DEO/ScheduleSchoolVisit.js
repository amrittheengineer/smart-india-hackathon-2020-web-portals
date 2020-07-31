import React, { useState, useEffect, useContext, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { Loading } from "../Components/MainbarComponent";
import { TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { DEOContext } from "../Context/DEOContext";
import { GlobalStateContext } from "../Context/GlobalStateContext";

function SimpleSelect({ categoryRef }) {
  const { MEOList } = useContext(DEOContext);
  return (
    <div>
      {MEOList ? (
        <FormControl variant="outlined" className="modal-input">
          <InputLabel>Visitor</InputLabel>
          <Select
            inputRef={categoryRef}
            label="Choose a Visitor"
            defaultValue=""
          >
            {MEOList.map((c) => (
              <MenuItem key={c.mId} value={c.mId}>
                {c.userId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
    </div>
  );
}

const ScheduleSchoolVisit = ({ schoolId, closeThis }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  const { scheduleVisit } = useContext(DEOContext);
  const { showToast } = useContext(GlobalStateContext);
  const inputDateRef = useRef(null);
  const inputCategoryRef = useRef(null);

  useEffect(() => {}, []);
  return (
    <>
      <Dialog open={schoolId !== null} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Visit</DialogTitle>
        <DialogContent>
          {requestingAPI ? (
            <Loading message="Scheduling a visit..." />
          ) : (
            <div>
              {schoolId ? (
                <SimpleSelect categoryRef={inputCategoryRef} />
              ) : null}
              <TextField
                variant="outlined"
                inputRef={inputDateRef}
                className="modal-input"
                type="date"
                defaultValue={(() => {
                  const datee = new Date();
                  const month = datee.getMonth() + 1;
                  const date = datee.getDate();
                  return `${datee.getFullYear()}-${
                    month > 9 ? month : `0${month}`
                  }-${date > 9 ? date : `0${date}`}`;
                })()}
                inputProps={{
                  min: (() => {
                    const datee = new Date();
                    const month = datee.getMonth() + 1;
                    const date = datee.getDate();
                    return `${datee.getFullYear()}-${
                      month > 9 ? month : `0${month}`
                    }-${date > 9 ? date : `0${date}`}`;
                  })(),
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
              const deoId = inputCategoryRef.current.value.trim();
              const dateInt = new Date(inputDateRef.current.value).getTime();
              console.log(schoolId, deoId, dateInt);

              if (!deoId) {
                return showToast("Please choose a visitor.");
              }

              setRequestingAPI(true);

              scheduleVisit(schoolId, deoId, dateInt, () => {
                closeThis();
                setRequestingAPI(false);
              });
            }}
            color="primary"
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ScheduleSchoolVisit;
