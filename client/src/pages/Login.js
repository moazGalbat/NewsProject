import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../context/userContext";

export default function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [errors, setErrors]= useState({})
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const {setCurrentUser}= useContext(UserContext)

    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    
    useEffect(() => {
        if (existingTokens) {
            setLoggedIn(true);
        }
    }, [isLoggedIn])

    const referer = props?.location?.state?.referer || '/';

    function postLogin() {
        axios.post("/login", {
            email: user.email,
            password: user.password,
        }).then(result => {
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
        postLogin();
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
            {errors.wrongCredentials && <span>{errors.wrongCredentials}</span>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" name="email" onChange={handleChange} value={user.email} />
                {errors.email && <span>{errors.email}</span>}

                <input type="password" placeholder="password" name="password" onChange={handleChange} value={user.password} />
                {errors.password && <span>{errors.password}</span>}

                <button type="submit">Sign In</button>
            </form>
            <Link to="/signup">Don't have an account?</Link>
        </>
    )
}
