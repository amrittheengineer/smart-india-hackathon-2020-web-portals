import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import CategoryCheckbox from "./Checkbox";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard() {
    const classes = useStyles();

    return (
      <Card className={classes.root} variant="outlined" color="primary">
        <CardContent>
          <Typography variant="h5" component="h2">
            Not Satisfied?
          </Typography>
          <TextField id="standard-basic" label="Title of Report" />
          <br />
          <br />
          <Typography variant="subtitle1" component="h2">
            Select the Category
          </Typography>
          <CategoryCheckbox />
          <TextField
            id="standard-textarea"
            label="Report in Brief"
            multiline
            fullWidth
          />
        </CardContent>
        <br />
      </Card>
    );
}
