import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RadioButton from "./RadioButton";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        + Add new Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the following details to add a Profile.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            variant="outlined"
            fullWidth
          />
          <br />
          <br />
          <RadioButton />
          <br />
          <br />
          <TextField
            id="outlined-number"
            label="Identification Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
