import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';


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
                <Typography variant="h5" component="h2" color="primary">
                    Create a New Account
                </Typography>
                <br />
                <TextField
                    required
                    id="outlined-required"
                    label="Email-Id"
                    defaultValue=""
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Mobile Number"
                    defaultValue=""
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
            </CardContent>
            <br />
            <CardActions>
                <Button size="small" color="primary">Sign Up</Button>
            </CardActions>
        </Card>
    );
}
