import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { DEOContext } from "../Context/DEOContext";
import SchoolIcon from "@material-ui/icons/School";
import { MainbarErrorMessage, Loading } from "../Components/MainbarComponent";
import Add from "@material-ui/icons/Add";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Button,
  CardContent,
} from "@material-ui/core";
import CreateQuestionnaireDialog from "./CreateQuestionnaireDialog";

const Questionnaire = (props) => {
  const { classes, handleDrawerToggle } = useContext(GlobalStateContext);
  const { questionnaireList } = useContext(DEOContext);

  const [createDialogVisibility, setCreateDialogVisibility] = useState(false);

  return (
    <>
      <CreateQuestionnaireDialog
        visible={createDialogVisibility}
        closeThis={() => setCreateDialogVisibility(false)}
      />
      <AppBar position="relative" className="app-bar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Visit Questions
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setCreateDialogVisibility(true)}
            startIcon={<Add />}
            size="small"
          >
            Add Visit Questions
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mainbar-content">
        {questionnaireList ? (
          questionnaireList.length > 0 ? (
            <QuestionnaireList questionnaireList={questionnaireList} />
          ) : (
            // grievances.map((g) => <GrievanceCard key={g.date} grievance={g} />)
            <MainbarErrorMessage message="No Questions found." />
          )
        ) : (
          <Loading message="Loading Questions..." />
        )}
      </div>
    </>
  );
};

const QuestionnaireList = ({ questionnaireList }) => {
  return (
    <>
      {questionnaireList.map((r) => (
        <Accordion
          key={r.categoryName}
          variant="outlined"
          className="category-data-accordion"
          defaultExpanded
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary aria-controls="panel1d-content">
            <Typography>{r.categoryName}</Typography>
          </AccordionSummary>
          <AccordionDetails className="data-list">
            {r.fieldData.map((q) => (
              <Card
                key={q.question + q.qType + Math.random()}
                style={{ width: "100%" }}
                variant="outlined"
              >
                <CardContent style={{ display: "flex" }}>
                  <Typography style={{ flex: 1 }} variant="caption">
                    {q.question}
                  </Typography>
                  <Typography variant="caption">
                    Type: {q.qType ? "Data" : "Score"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default Questionnaire;
