import React, { useState, useEffect, useContext, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { Loading } from "../Components/MainbarComponent";
import {
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { SchoolContext } from "../Context/SchoolContext";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { qTypes } from "../Constants";
import Add from "@material-ui/icons/Add";
import { DEOContext } from "../Context/DEOContext";

const defaultValue = { question: "", qType: 0 };

function SelectQuestionType({ setQType, defaultValue }) {
  return (
    <div>
      <FormControl variant="outlined" style={{ flex: 1 }}>
        <InputLabel>Type</InputLabel>
        <Select
          onChange={(e) => setQType(e.target.value)}
          defaultValue={defaultValue}
          label="Type"
        >
          {qTypes.map((c) => (
            <MenuItem key={c.type} value={c.value}>
              {c.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const Question = ({ sendData, defaultValue, createNewQuestion }) => {
  const [qState, setQState] = useState(defaultValue);
  useEffect(() => {
    sendData(qState);
  }, [qState]);
  return (
    <div style={{ display: "flex", marginTop: "8px" }}>
      <TextField
        label="Question"
        variant="outlined"
        style={{ flex: 1, marginRight: "16px" }}
        onChange={(e) => {
          e.persist();
          setQState((prev) => ({
            ...prev,
            question: e.target.value.trim(),
          }));
        }}
        autoFocus
        onKeyDown={(e) => {
          if (e.keyCode === 13 && qState.question) {
            e.preventDefault();
            createNewQuestion();
          }
        }}
      />

      <SelectQuestionType
        setQType={(qType) => {
          console.log(qType);
          setQState((prev) => ({ ...prev, qType }));
        }}
        defaultValue={defaultValue.qType}
      />
    </div>
  );
};

const CreateQuestionnaireDialog = ({ visible, closeThis }) => {
  const [requestingAPI, setRequestingAPI] = useState(false);
  const { createQuestionnaire } = useContext(DEOContext);
  const { showToast } = useContext(GlobalStateContext);
  const inputCategoryRef = useRef(null);
  const [visibleToTeachers, setVisibleToTeachers] = useState(true);
  const [questionsSetComponents, setQuestionsSetComponents] = useState([
    { ...defaultValue },
  ]);
  // const [questionsList, setQuestionsList]

  const appendNewQuestion = () => {
    setQuestionsSetComponents((prev) => prev.concat([defaultValue]));
  };
  return (
    <>
      <Dialog open={visible} maxWidth="md" fullWidth>
        <DialogTitle>New Questions Set</DialogTitle>
        <DialogContent>
          {requestingAPI ? (
            <Loading message="Adding new questions set..." />
          ) : (
            <div>
              {/* <SimpleSelect categoryRef={inputCategoryRef} /> */}

              <TextField
                label="Category Name"
                variant="outlined"
                inputRef={inputCategoryRef}
                className="modal-input"
                autoFocus
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={visibleToTeachers}
                    onChange={(e) => {
                      setVisibleToTeachers(e.target.checked);
                    }}
                    color="primary"
                  />
                }
                label="Visible to teacher"
                style={{ display: "block" }}
              />
              {/* <Typography variant="caption">Add questions from here</Typography> */}
              {questionsSetComponents.map((q, ind) => (
                <Question
                  key={ind}
                  defaultValue={{ ...defaultValue }}
                  sendData={(data) => {
                    setQuestionsSetComponents((prev) => [
                      ...prev.map((p, qInd) => (qInd === ind ? data : p)),
                    ]);
                  }}
                  createNewQuestion={() => {
                    if (ind + 1 === questionsSetComponents.length)
                      appendNewQuestion();
                  }}
                />
              ))}
              <Button
                startIcon={<Add />}
                onClick={appendNewQuestion}
                color="primary"
              >
                Add Another Question
              </Button>
            </div>
          )}
        </DialogContent>
        <DialogActions style={requestingAPI ? { display: "none" } : {}}>
          <Button
            onClick={() => {
              closeThis();
              setQuestionsSetComponents([{ ...defaultValue }]);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // console.log(inputMessageRef.current);
              // return;
              const category = inputCategoryRef.current.value.trim();
              const validQuestionsSet = questionsSetComponents.filter(
                ({ question }) => question.length > 0
              );
              if (!category) {
                return showToast("Please name the category.");
              }
              if (!validQuestionsSet.length) {
                return showToast("At lease 1 question should be there.");
              }
              // return;
              setRequestingAPI(true);

              createQuestionnaire(
                category,
                validQuestionsSet,
                visibleToTeachers,
                () => {
                  closeThis();
                  setQuestionsSetComponents([{ ...defaultValue }]);
                  setRequestingAPI(false);
                }
              );
            }}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateQuestionnaireDialog;
