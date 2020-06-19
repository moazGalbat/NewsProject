import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from './context/userContext';
import axios from 'axios';

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const history = useHistory()

  const headers = {
    'Authorization': `${JSON.parse(localStorage.getItem("tokens"))}`
  }

  useEffect(() => {
    console.log(headers)
    axios.get("/checkAuth", { headers })
      .catch(e => {
        setCurrentUser(null);
        localStorage.removeItem("tokens");
        history.push("/login")
      })
  })


  return (
    <Route {...rest} render={(props) =>
      currentUser?.email ?
        (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
        )
    }
    />
  );
}

export default PrivateRoute;