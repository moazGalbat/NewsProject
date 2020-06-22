import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {getAuthTokens} from '../helpers/authHelpers';

function PrivateRoute({ component: Component, ...rest }) {
  

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