import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink, Redirect } from 'react-router-dom';
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
import loginSchema from '../schemas/loginSchema'
import Alert from '@material-ui/lab/Alert';


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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export default function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [errors, setErrors]= useState({})
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const {setCurrentUser}= useContext(UserContext)
    const classes = useStyles();


    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    
    useEffect(() => {
        if (existingTokens) {
            setLoggedIn(true);
        }
    }, [isLoggedIn])

    const referer = props?.location?.state?.referer || '/';

    function postLogin() {
        axios.post("/login", user )
        .then(result => {
            localStorage.setItem("tokens", JSON.stringify(result.data.token))
            setCurrentUser(result.data.user)
            setLoggedIn(true);
        }).catch(e => {
            if (e.response.status === 401 ){
                setErrors({wrongCredentials: e.response.data.message})
            }
            else if (e.response.status === 422){
                setErrors( e.response.data.details.errors.reduce((agg, err) => ({ ...agg, [err.param]: err.msg }), {}));
            }
            else if (e.response.status === 500){
                console.log(e.response.data.message, e.response.status);
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            //--------------//validating form//---------//
            const cleanedData = loginSchema.clean(user)
            loginSchema.validate(cleanedData);
            postLogin();
        } catch (error) {
            setErrors(error.details.reduce((agg, e) => ({ ...agg, [e.name]: e.message }), {}));
        }
    }

    const handleChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {errors.wrongCredentials && <Alert severity="error">{errors.wrongCredentials}!!</Alert>}

                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                        value={user.email}
                        error = {errors.email? true:false}
                        helperText = {errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={user.password}
                        error = {errors.password? true:false}
                        helperText = {errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Link component={RouterLink} to="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
                </Container>
        </>
    )
}
