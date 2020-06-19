import React, { useState, useContext } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../context/userContext";

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


    function signup() {
        axios.post("/signup", user ).then(result => {
            localStorage.setItem("tokens", JSON.stringify(result.data.token))
            setCurrentUser(result.data.user)
            setLoggedIn(true);
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
        signup();
    }

    const handleChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }


    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="email" onChange={handleChange} value={user.email}/>
            {errors.email && <span>{errors.email}</span>}

            <input type="password" name="password" placeholder="password" onChange={handleChange} value={user.password}/>
            {errors.password && <span>{errors.password}</span>}

            <input type="password" name="passwordConfirmation" placeholder="password" onChange={handleChange} value={user.passwordConfirmation}/>
            {errors.passwordConfirmation && <span>{errors.passwordConfirmation}</span>}

            <input type="text" name="firstName" placeholder="first name" onChange={handleChange} value={user.firstName}/>
            {errors.firstName && <span>{errors.firstName}</span>}

            <input type="text" name="lastName" placeholder="last name" onChange={handleChange} value={user.lastName}/>
            {errors.lastName && <span>{errors.lastName}</span>}

            <button type="submit">Sign Up</button>
        </form>
        <Link to="/login">Already have an account?</Link>
    </>
    )
}
