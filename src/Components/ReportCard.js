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
                <Typography variant="body2" component="p">
                    The library in our school is very good . For this we require 5 Stars
                    or atleast 4 Stars but they rewarded 1 Star . So this is not at all
                    acceptable. Even we allow our students to library once in a week for
                    2 hours. So we are reporting against the decision by the Officer.
        </Typography>
            </CardContent>
        </Card>
    );
}
