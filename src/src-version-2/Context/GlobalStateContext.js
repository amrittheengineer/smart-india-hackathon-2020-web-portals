import React, { createContext, useState } from "react";
import {
  makeStyles,
  useTheme,
  Snackbar,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import {
  QUESTION_TYPE_DATA,
  QUESTION_TYPE_SCORE,
  MAX_SCORE,
} from "../Constants";

export const GlobalStateContext = createContext();

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "#fff",
    backgroundColor: "#fff",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    backgroundColor: "#8964e0",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: "100%",
    // backgroundColor: theme.palette.background,
    backgroundColor: "#8964e0",
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#7d47bd",
    },
    // divider: "#fff",
    // background: "#fff",
    secondary: {
      main: "#ff0000",
    },
  },
});

export const GlobalStateContextProvider = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [toast, showToast] = React.useState("");

  const [schools, setSchools] = useState([
    "Don bosco School",
    "Don bosco Mat. School",
    "Union public School",
  ]);
  const [districts, setDistricts] = useState([
    "Anantapur",
    "Chittoor",
    "Guntur",
  ]);

  React.useEffect(() => {
    if (toast) {
      setTimeout(() => {
        showToast("");
      }, 3000);
    }
  }, [toast]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getChartPlots = (reportArray) => {
    let aggregateData = {};
    reportArray.forEach(({ reportData }) => {
      // const score_based_questions = reportData.filter(
      //   ({ qType }) => qType === QUESTION_TYPE_SCORE
      // );

      reportData.map(({ categoryName, fieldData }) => {
        if (!aggregateData[categoryName]) {
          aggregateData[categoryName] = [];
        }

        const score_based_questions = fieldData.filter(
          ({ qType }) => qType === QUESTION_TYPE_SCORE
        );

        // console.log("score_based_questions", score_based_questions);

        aggregateData[categoryName].push(
          // fieldData.reduce((old, { score, total }) => {
          //   return old + (score / total) * 100;
          // }, 0) / fieldData.length
          (score_based_questions.reduce((old, { answer }) => {
            return old + (isNaN(Number(answer)) ? 0 : Number(answer));
          }, 0) /
            (score_based_questions.length * MAX_SCORE)) *
            100
        );
      });
    });
    const parameters = Object.keys(aggregateData);
    parameters.forEach((p) => {
      aggregateData[p] = Math.floor(
        aggregateData[p].reduce((old, current) => {
          return old + current;
        }, 0) / aggregateData[p].length
      );
    });
    // console.log(aggregateData);
    return aggregateData;
  };

  const getDataQuestions = (reportData) => {
    let aggregateData = {};
    reportData.map(({ categoryName, fieldData }) => {
      const data_based_questions = fieldData
        .filter(({ qType }) => qType === QUESTION_TYPE_DATA)
        .map(({ question, answer }) => ({ question, answer }));

      if (data_based_questions.length > 0) {
        aggregateData[categoryName] = data_based_questions;
        console.log("data_based_questions", data_based_questions);
      }
    });
    return aggregateData;
  };

  return (
    <GlobalStateContext.Provider
      value={{
        classes,
        theme,
        mobileOpen,
        handleDrawerToggle,
        showToast,
        getChartPlots,
        getDataQuestions,
        appTheme,
        schools,
        districts,
      }}
    >
      <MuiThemeProvider theme={appTheme}>
        {children}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          message={toast}
          open={toast !== ""}
        />
      </MuiThemeProvider>
    </GlobalStateContext.Provider>
  );
};
