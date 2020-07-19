import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import RatingStar from "./RatingStar";

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
          Anonymous
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Title of Review
        </Typography>
        <RatingStar readOnly />
        <br />
        <Typography variant="body2" component="p">
          The teaching quality is very good. The knowledge of the subject from
          the teacher's perspective could be improved. The staffs do not have
          the proper experience to handle the students of this capability to
          work on projects.
        </Typography>
      </CardContent>
    </Card>
  );
}
