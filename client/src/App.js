import React from 'react';
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Home from './pages/Home';
import Sources from './pages/Sources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserContextProvider from "./context/userContext";
import Navbar from './components/Navbar'
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <UserContextProvider>
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/sources" component={Sources} />
      </Switch>
    </Router>
    </UserContextProvider>
  );
}

export default App;
