import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import {getAuthTokens, removeAuthTokens} from '../helpers/authHelpers';

function PrivateRoute({ component: Component, ...rest }) {
  const {setCurrentUser } = useContext(UserContext)
  const history = useHistory()

  

  useEffect(() => {
    const headers = {
      'Authorization': `${getAuthTokens()}`
    }
    axios.get("/checkAuth", { headers })
      .catch(e => {
        setCurrentUser(null);
        removeAuthTokens();
        history.push("/login")
      })
  })


  return (
    <Route {...rest} render={(props) =>
      getAuthTokens()?
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