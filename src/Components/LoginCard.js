import React , {useState , useEffect} from "react";
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

const Login = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (username.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    const handleLogin = () => {
        if (username === '9876543210' && password === '9876543210') {
            setError(false);
            setHelperText('Login Successfully');
        } else {
            setError(true);
            setHelperText('Incorrect username or password')
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleLogin();
        }
    };
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                    Login
                </Typography>
                <br />
                <TextField
                    error={error}
                    required
                    id="outlined-required"
                    label="Email-id"
                    defaultValue=""
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
                <TextField
                    error={error}
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    helperText={helperText}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
            </CardContent>
            <br />
            <CardActions>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => handleLogin()}
                    disabled={isButtonDisabled}
                    >
                    Log In
                </Button>
                <Button size="small" color="primary">Sign Up</Button>
            </CardActions>
        </Card>
    );
}

export default Login;