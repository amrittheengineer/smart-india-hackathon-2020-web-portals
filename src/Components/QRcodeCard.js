import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
                    alt="QR code"
                    height="240"
                    image="/QRcode.png"
                    title="Photo of School or Visitor"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        QR code 
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        You have a Schedule visit today!
          </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
