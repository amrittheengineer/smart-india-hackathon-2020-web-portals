import React, { useState, useContext, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

import { Loading } from "../Components/MainbarComponent";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { TeacherContext } from "../Context/TeacherContext";

const ChangePasswordDialog = ({ visible, closeThis }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  const { isPasswordChanged, changePassword, checkOldPasswordMatches } =
    useContext(TeacherContext);
  const { showToast } = useContext(GlobalStateContext);
  const inputOldPassRef = useRef(null);
  const inputNewPassRef = useRef(null);

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
