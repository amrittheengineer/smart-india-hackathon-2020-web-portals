import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Title of Grievence
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Type of Grievence
        </Typography>
        <Typography variant="body2" component="p">
          The library in our school needs to be improved . For this we require 
          more racks and shelfs to be implemented in our school. More than this
          the students need more books that are related to their subject through
          which their creativity and knowledge can be improved.
        </Typography>
      </CardContent>
    </Card>
  );
}
