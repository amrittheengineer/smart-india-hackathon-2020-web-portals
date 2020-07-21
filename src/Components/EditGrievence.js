import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Card className={classes.root} variant="outlined" color="primary">
            <CardContent>
                <Typography variant="h5" component="h2">
                    Add Grievence
                </Typography>
                <TextField id="standard-basic" label="Enter the title" />
                <br />
                <br />
                <Typography variant="h6" component="p">
                    Select the Grievence Type:
                </Typography>
                <FormControl className={classes.formControl}>
                    <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Select</em>
                        </MenuItem>
                        <MenuItem value={10}>Bus</MenuItem>
                        <MenuItem value={20}>Canteen</MenuItem>
                        <MenuItem value={30}>Class</MenuItem>
                        <MenuItem value={40}>Lab</MenuItem>
                        <MenuItem value={50}>Library</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br />
                <TextField
                    id="standard-textarea"
                    label="In Brief"
                    multiline
                    fullWidth
                />
            </CardContent>
            <br />
        </Card>
    );
}
