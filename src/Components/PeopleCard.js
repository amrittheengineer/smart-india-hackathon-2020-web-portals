import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 240,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Photo of Visitor"
          height="240"
          image="/user-logo.png"
          title="Photo of Visitor"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Designation
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Know More
        </Button>
      </CardActions>
    </Card>
  );
}
