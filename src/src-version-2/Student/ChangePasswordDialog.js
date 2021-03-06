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

const ChangePasswordDialog = ({ visible, closeThis }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  const {
    isPasswordChanged,
    changePassword,
    checkOldPasswordMatches,
  } = useContext(StudentContext);
  const { showToast } = useContext(GlobalStateContext);
  const inputOldPassRef = useRef(null);
  const inputNewPassRef = useRef(null);
  const teacherRef = useRef(null);

  return (
    <>
      <Dialog open={visible} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {requestingAPI ? (
            <Loading message="Changing Password..." />
          ) : (
            <div>
              {isPasswordChanged() ? (
                <TextField
                  label="Old Password"
                  variant="outlined"
                  type="password"
                  inputRef={(inp) => (inputOldPassRef.current = inp)}
                  className="modal-input"
                />
              ) : null}
              <TextField
                label="New Password"
                inputRef={(inp) => (inputNewPassRef.current = inp)}
                variant="outlined"
                type="password"
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
              // console.log(inputOldPassRef.current);
              // return;

              if (isPasswordChanged()) {
                const oldPass = inputOldPassRef.current.value;

                if (!checkOldPasswordMatches(oldPass)) {
                  return showToast("Old password is wrong.");
                }
              }

              const newPass = inputNewPassRef.current.value;

              if (newPass.length === 0) {
                return showToast("New password is empty");
              }

              setRequestingAPI(true);

              changePassword(newPass, () => {
                closeThis();
                setRequestingAPI(false);
              });
            }}
            color="primary"
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ChangePasswordDialog;
