import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../context/userContext";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import signupSchema from '../schemas/signupSchema'
import {getAuthTokens ,setAuthTokens, getUserFromToken} from '../helpers/authHelpers'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export default function Signup() {
    const [user, setUser] = useState({
        email: "",
        firstName:"",
        lastName:"",
        password: "",
        passwordConfirmation:"",
    })
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [errors, setErrors]= useState({})
    const {setCurrentUser}= useContext(UserContext)
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        const existingTokens = getAuthTokens();
        if (existingTokens) {
            setLoggedIn(true);
        }
    }, [isLoggedIn])

    function signup() {
        axios.post("/signup", user ).then(result => {
            setAuthTokens(result.data.token);
            setCurrentUser(getUserFromToken(result.data.token));
            history.push('/sources');
        }).catch(e => {
            if (e.response.status === 422){
                setErrors( e.response.data.details.errors.reduce((agg, err) => ({ ...agg, [err.param]: err.msg }), {}));
            }
            else {
                console.log(e.response.data.message, e.response.status);
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            const cleanedData = signupSchema.clean(user)
            signupSchema.validate(cleanedData);
            signup();
        } catch (error) {
            setErrors(error.details.reduce((agg, e) => ({ ...agg, [e.name]: e.message }), {}));
        }
    }

    const handleChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={handleChange}
                        value={user.firstName}
                        error = {errors.firstName? true:false}
                        helperText = {errors.firstName}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange={handleChange}
                        value={user.lastName}
                        error = {errors.lastName? true:false}
                        helperText = {errors.lastName}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        value={user.email}
                        error = {errors.email? true:false}
                        helperText = {errors.email}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={user.password}
                        error = {errors.password? true:false}
                        helperText = {errors.password}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name="passwordConfirmation"
                        label="Password Confirmation"
                        type="password"
                        id="passwordConfirmation"
                        onChange={handleChange}
                        value={user.passwordConfirmation}
                        error = {errors.passwordConfirmation? true:false}
                        helperText = {errors.passwordConfirmation}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link component={RouterLink} to="/login" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
  );
}
