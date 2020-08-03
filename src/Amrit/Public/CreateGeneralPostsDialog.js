import React, { useState, useContext, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Loading } from "../Components/MainbarComponent";
import { TextField } from "@material-ui/core";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { DEOContext } from "../Context/DEOContext";

const CreateGeneralPostsDialog = ({ visible, closeThis }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  const { postGeneralMessage } = useContext(DEOContext);
  const { showToast } = useContext(GlobalStateContext);
  const inputMessageRef = useRef(null);
  const inputSubjectRef = useRef(null);

  return (
    <>
      <Dialog open={visible} maxWidth="md" fullWidth>
        <DialogTitle>New Grievance</DialogTitle>
        <DialogContent>
          {requestingAPI ? (
            <Loading message="Publishing message..." />
          ) : (
            <div>
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
              // const category = inputCategoryRef.current.value.trim();
              // if (!category) {
              //   return showToast("Please choose the category.");
              // }
              if (!subject) {
                return showToast("Please give a subject for message.");
              }
              if (!message) {
                return showToast("Kindly brief the message.");
              }

              setRequestingAPI(true);

              postGeneralMessage(message, subject, () => {
                closeThis();
                setRequestingAPI(false);
              });
            }}
            color="primary"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateGeneralPostsDialog;
