import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Home from './pages/Home';
import Sources from './pages/Sources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserContext } from './context/userContext';
import { getUserFromToken, getAuthTokens } from './helpers/authHelpers';
import Navbar from './components/Navbar'
import PrivateRoute from './routes/PrivateRoute';

function App() {
  let user = null;
  const existingTokens = getAuthTokens();
  if (existingTokens) {
    user = getUserFromToken(existingTokens)
  }
  const [currentUser,setCurrentUser] = useState(user)
  const providerValue = useMemo(()=>({currentUser, setCurrentUser}),[currentUser,setCurrentUser])


  return (
    <UserContext.Provider value={providerValue}>
    <Router>
      {/* {existingTokens?<Navbar/>:null} */}
      <Navbar/>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/sources" component={Sources} />
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
